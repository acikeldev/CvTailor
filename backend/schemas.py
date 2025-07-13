from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# User schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    email: str
    id: int

# CV schemas
class CVCreate(BaseModel):
    name: str
    content: str
    is_primary: bool = False

class CVResponse(BaseModel):
    id: int
    name: str
    content: str
    is_primary: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Job schemas
class JobCreate(BaseModel):
    title: str
    company: Optional[str] = None
    location: Optional[str] = None
    description: str
    requirements: Optional[str] = None
    salary_range: Optional[str] = None
    job_url: Optional[str] = None
    linkedin_job_id: Optional[str] = None

class JobResponse(BaseModel):
    id: int
    title: str
    company: Optional[str]
    location: Optional[str]
    description: str
    requirements: Optional[str]
    salary_range: Optional[str]
    job_url: Optional[str]
    linkedin_job_id: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Analysis schemas
class CVAnalysisRequest(BaseModel):
    cv_id: int
    job_id: int

class CVAnalysisResponse(BaseModel):
    id: int
    cv_id: int
    job_id: int
    match_score: Optional[int]
    strengths: Optional[List[str]]
    improvements: Optional[List[str]]
    recommendations: Optional[List[str]]
    skills_gap: Optional[List[str]]
    analysis_data: Optional[Dict[str, Any]]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Job Application schemas
class JobApplicationCreate(BaseModel):
    job_id: int
    cv_id: Optional[int] = None
    status: str = "interested"
    notes: Optional[str] = None

class JobApplicationResponse(BaseModel):
    id: int
    user_id: int
    job_id: int
    cv_id: Optional[int]
    status: str
    notes: Optional[str]
    applied_date: Optional[datetime]
    interview_date: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True 