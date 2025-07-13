from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import os

from database import engine, get_db
from models import Base, User, CV, Job, CVAnalysis, JobApplication
from schemas import (
    UserCreate, UserLogin, Token, UserResponse,
    CVCreate, CVResponse, JobCreate, JobResponse,
    CVAnalysisRequest, CVAnalysisResponse,
    JobApplicationCreate, JobApplicationResponse
)
from config import settings
from services.gemini_service import GeminiService
from services.linkedin_service import LinkedInService
from fastapi.responses import RedirectResponse
import requests

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize Gemini service
gemini_service = None
if settings.GEMINI_API_KEY:
    gemini_service = GeminiService(settings.GEMINI_API_KEY)

# Security configuration
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

# Password hashing
from passlib.context import CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT token security
security = HTTPBearer()

app = FastAPI(title="CV Tailor API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT functions
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Optional

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return email
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

def create_demo_users(db: Session):
    """Create demo users for testing"""
    demo_users = [
        {"email": "demo@example.com", "password": "demo123"},
        {"email": "test@example.com", "password": "test123"},
        {"email": "admin@cvtailor.com", "password": "admin123"}
    ]
    
    for user_data in demo_users:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == user_data["email"]).first()
        if not existing_user:
            hashed_password = get_password_hash(user_data["password"])
            db_user = User(
                email=user_data["email"],
                hashed_password=hashed_password
            )
            db.add(db_user)
    
    db.commit()

@app.on_event("startup")
async def startup_event():
    """Create demo users on startup"""
    db = next(get_db())
    try:
        create_demo_users(db)
        print("Demo users created successfully!")
        print("Demo accounts:")
        print("- demo@example.com / demo123")
        print("- test@example.com / test123")
        print("- admin@cvtailor.com / admin123")
    finally:
        db.close()

# Authentication endpoints
@app.post("/signup", response_model=UserResponse)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    return UserResponse(email=db_user.email, id=db_user.id)

@app.post("/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/me", response_model=UserResponse)
async def get_current_user(email: str = Depends(verify_token), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(email=db_user.email, id=db_user.id)

# CV endpoints
@app.post("/cvs", response_model=CVResponse)
async def create_cv(cv: CVCreate, email: str = Depends(verify_token), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_cv = CV(
        user_id=db_user.id,
        name=cv.name,
        content=cv.content,
        is_primary=cv.is_primary
    )
    
    # If this is primary, unset other primary CVs
    if cv.is_primary:
        db.query(CV).filter(CV.user_id == db_user.id, CV.is_primary == True).update({"is_primary": False})
    
    db.add(db_cv)
    db.commit()
    db.refresh(db_cv)
    
    return CVResponse.from_orm(db_cv)

@app.get("/cvs", response_model=list[CVResponse])
async def get_cvs(email: str = Depends(verify_token), db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    cvs = db.query(CV).filter(CV.user_id == db_user.id).all()
    return [CVResponse.from_orm(cv) for cv in cvs]

# Job endpoints
@app.post("/jobs", response_model=JobResponse)
async def create_job(job: JobCreate, db: Session = Depends(get_db)):
    db_job = Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    return JobResponse.from_orm(db_job)

@app.get("/jobs", response_model=list[JobResponse])
async def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    return [JobResponse.from_orm(job) for job in jobs]

# CV Analysis endpoint
@app.post("/analyze-cv", response_model=CVAnalysisResponse)
async def analyze_cv(analysis_request: CVAnalysisRequest, email: str = Depends(verify_token), db: Session = Depends(get_db)):
    if not gemini_service:
        raise HTTPException(status_code=500, detail="Gemini AI service not configured")
    
    # Get CV and Job
    cv = db.query(CV).filter(CV.id == analysis_request.cv_id).first()
    job = db.query(Job).filter(Job.id == analysis_request.job_id).first()
    
    if not cv or not job:
        raise HTTPException(status_code=404, detail="CV or Job not found")
    
    # Perform analysis using Gemini
    analysis_result = await gemini_service.analyze_cv(cv.content, job.description)
    
    # Save analysis to database
    db_analysis = CVAnalysis(
        cv_id=analysis_request.cv_id,
        job_id=analysis_request.job_id,
        match_score=analysis_result.get("match_score"),
        strengths=analysis_result.get("strengths"),
        improvements=analysis_result.get("improvements"),
        recommendations=analysis_result.get("recommendations"),
        skills_gap=analysis_result.get("skills_gap"),
        analysis_data=analysis_result
    )
    
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    
    return CVAnalysisResponse.from_orm(db_analysis)

# LinkedIn endpoints
@app.post("/linkedin/connect")
async def connect_linkedin(auth_code: str, email: str = Depends(verify_token)):
    """Connect LinkedIn account using authorization code"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.connect_account(auth_code)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to connect LinkedIn: {str(e)}")

@app.get("/linkedin/profile")
async def get_linkedin_profile(email: str = Depends(verify_token)):
    """Get LinkedIn profile data"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.get_profile_data()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get LinkedIn profile: {str(e)}")

@app.get("/linkedin/experience")
async def get_linkedin_experience(email: str = Depends(verify_token)):
    """Get LinkedIn work experience"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.get_experience()
        return {"experience": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get LinkedIn experience: {str(e)}")

@app.get("/linkedin/skills")
async def get_linkedin_skills(email: str = Depends(verify_token)):
    """Get LinkedIn skills"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.get_skills()
        return {"skills": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get LinkedIn skills: {str(e)}")

@app.post("/linkedin/generate-cv")
async def generate_cv_from_linkedin(email: str = Depends(verify_token)):
    """Generate CV content from LinkedIn profile"""
    try:
        linkedin_service = LinkedInService()
        cv_content = await linkedin_service.generate_cv_from_linkedin()
        return {"cv_content": cv_content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate CV from LinkedIn: {str(e)}")

@app.post("/linkedin/analyze")
async def analyze_linkedin_profile(job_description: str, email: str = Depends(verify_token)):
    """Analyze LinkedIn profile against job description"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.analyze_linkedin_profile(job_description)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze LinkedIn profile: {str(e)}")

@app.post("/linkedin/sync")
async def sync_linkedin_profile(email: str = Depends(verify_token)):
    """Sync user data with LinkedIn profile"""
    try:
        linkedin_service = LinkedInService()
        result = await linkedin_service.sync_with_linkedin()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to sync LinkedIn profile: {str(e)}")

@app.post("/linkedin/disconnect")
async def disconnect_linkedin(email: str = Depends(verify_token)):
    """Disconnect LinkedIn account"""
    try:
        linkedin_service = LinkedInService()
        result = linkedin_service.disconnect()
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to disconnect LinkedIn: {str(e)}")

@app.get("/auth/linkedin/login")
def linkedin_login():
    linkedin_auth_url = (
        "https://www.linkedin.com/oauth/v2/authorization"
        f"?response_type=code"
        f"&client_id={settings.LINKEDIN_CLIENT_ID}"
        f"&redirect_uri={settings.LINKEDIN_REDIRECT_URI}"
        f"&scope=r_liteprofile%20r_emailaddress"
    )
    return RedirectResponse(linkedin_auth_url)

@app.get("/auth/linkedin/callback")
def linkedin_callback(code: str):
    token_url = "https://www.linkedin.com/oauth/v2/accessToken"
    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": settings.LINKEDIN_REDIRECT_URI,
        "client_id": settings.LINKEDIN_CLIENT_ID,
        "client_secret": settings.LINKEDIN_CLIENT_SECRET,
    }
    response = requests.post(token_url, data=data, headers={"Content-Type": "application/x-www-form-urlencoded"})
    token_data = response.json()
    access_token = token_data.get("access_token")
    # Redirect to frontend with access_token as query param
    frontend_url = "http://localhost:5173/linkedin-callback"
    return RedirectResponse(f"{frontend_url}?access_token={access_token}")

@app.get("/")
async def root():
    return {"message": "CV Tailor API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 