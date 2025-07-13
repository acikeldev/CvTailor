# CVTailor - Architectural Design

## 1. System Overview

CVTailor is a monolith application built with React + Vite frontend and Python FastAPI backend, designed to provide AI-powered job search and CV optimization services.

## 2. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CVTailor Monolith                       │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)  │  Backend (Python FastAPI)        │
│  ┌─────────────────────┐  │  ┌─────────────────────────────┐  │
│  │   User Interface    │  │  │      API Layer              │  │
│  │   - Dashboard       │◄─┼─►│      - REST Endpoints       │  │
│  │   - CV Editor       │  │  │      - Authentication       │  │
│  │   - Job Tracker     │  │  │      - File Upload          │  │
│  │   - Analytics       │  │  │                             │  │
│  └─────────────────────┘  │  └─────────────────────────────┘  │
│                           │  ┌─────────────────────────────┐  │
│                           │  │     Business Logic          │  │
│                           │  │  - User Management          │  │
│                           │  │  - CV Processing            │  │
│                           │  │  - Job Analysis             │  │
│                           │  │  - Application Tracking     │  │
│                           │  └─────────────────────────────┘  │
│                           │  ┌─────────────────────────────┐  │
│                           │  │     Data Layer              │  │
│                           │  │  - PostgreSQL (Main DB)     │  │
│                           │  │  - Redis (Cache/Sessions)   │  │
│                           │  │  - File Storage (CVs)       │  │
│                           │  └─────────────────────────────┘  │
│                           │  ┌─────────────────────────────┐  │
│                           │  │     External Services       │  │
│                           │  │  - LinkedIn MCP Server      │  │
│                           │  │  - Google Gemini AI         │  │
│                           │  │  - OAuth Providers          │  │
│                           │  └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **UI Library**: Tailwind CSS + Headless UI
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **File Upload**: React Dropzone

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database ORM**: SQLAlchemy 2.0
- **Authentication**: JWT tokens
- **Background Tasks**: Celery + Redis
- **File Storage**: Local storage (S3 for production)
- **Validation**: Pydantic
- **Testing**: pytest

### Database
- **Primary**: PostgreSQL 15
- **Cache**: Redis 7
- **Migrations**: Alembic

### External Services
- **AI**: Google Gemini API
- **LinkedIn**: Custom MCP Server (based on mcp-linkedin)
- **Authentication**: LinkedIn OAuth 2.0

## 4. Database Schema

### Core Tables

```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    linkedin_id VARCHAR(255) UNIQUE,
    linkedin_access_token TEXT,
    linkedin_refresh_token TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- User profiles
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    target_role VARCHAR(200),
    experience_level VARCHAR(50),
    preferred_location VARCHAR(200),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CVs table
CREATE TABLE cvs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    content_text TEXT,
    parsed_data JSONB,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Jobs table
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    linkedin_job_id VARCHAR(255) UNIQUE,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    requirements TEXT,
    salary_range VARCHAR(100),
    job_url VARCHAR(500),
    posted_date DATE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Job applications
CREATE TABLE job_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'interested',
    notes TEXT,
    applied_date DATE,
    interview_date DATE,
    tailored_cv_id UUID REFERENCES cvs(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- CV analysis results
CREATE TABLE cv_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cv_id UUID REFERENCES cvs(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    match_score INTEGER,
    strengths JSONB,
    weaknesses JSONB,
    suggestions JSONB,
    analysis_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 5. API Design

### Authentication Endpoints
```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/linkedin/connect
GET    /api/auth/linkedin/callback
```

### User Management
```
GET    /api/users/profile
PUT    /api/users/profile
DELETE /api/users/account
```

### CV Management
```
GET    /api/cvs
POST   /api/cvs/upload
GET    /api/cvs/{cv_id}
PUT    /api/cvs/{cv_id}
DELETE /api/cvs/{cv_id}
POST   /api/cvs/{cv_id}/analyze
```

### Job Management
```
GET    /api/jobs/recommendations
GET    /api/jobs/search
GET    /api/jobs/{job_id}
POST   /api/jobs/{job_id}/bookmark
```

### Application Tracking
```
GET    /api/applications
POST   /api/applications
PUT    /api/applications/{app_id}
DELETE /api/applications/{app_id}
```

### CV Generation
```
POST   /api/cvs/generate
GET    /api/cvs/{cv_id}/download
```

## 6. MCP LinkedIn Integration

### Custom MCP Server Structure
Based on the mcp-linkedin repository, we'll create a customized version:

```python
# mcp_linkedin_server.py
from mcp import Server
from linkedin_api import Linkedin

class LinkedInMCPServer:
    def __init__(self):
        self.server = Server("linkedin")
        self.linkedin_client = None
        
    def setup_tools(self):
        @self.server.tool()
        async def get_user_profile(user_id: str):
            """Get LinkedIn user profile"""
            pass
            
        @self.server.tool()
        async def get_job_recommendations(limit: int = 10):
            """Get personalized job recommendations"""
            pass
            
        @self.server.tool()
        async def search_jobs(keywords: str, location: str = None, limit: int = 10):
            """Search for jobs on LinkedIn"""
            pass
            
        @self.server.tool()
        async def get_job_details(job_id: str):
            """Get detailed job information"""
            pass
```

### Integration with Backend
```python
# services/linkedin_service.py
import asyncio
from mcp_client import MCPClient

class LinkedInService:
    def __init__(self):
        self.mcp_client = MCPClient("linkedin")
    
    async def get_user_recommendations(self, user_id: str):
        """Get job recommendations for user"""
        return await self.mcp_client.call_tool(
            "get_job_recommendations",
            {"user_id": user_id, "limit": 20}
        )
    
    async def analyze_job_for_user(self, job_id: str, cv_content: str):
        """Analyze job against user's CV"""
        job_details = await self.mcp_client.call_tool(
            "get_job_details",
            {"job_id": job_id}
        )
        
        # Send to AI for analysis
        return await self.ai_service.analyze_cv_job_match(
            cv_content, job_details
        )
```

## 7. AI Integration with Gemini

### CV Analysis Service
```python
# services/ai_service.py
import google.generativeai as genai

class AIService:
    def __init__(self, api_key: str):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')
    
    async def analyze_cv_job_match(self, cv_content: str, job_description: str):
        """Analyze CV against job description"""
        prompt = f"""
        Analyze the following CV against the job description:
        
        CV:
        {cv_content}
        
        Job Description:
        {job_description}
        
        Provide analysis in JSON format:
        {{
            "match_score": <0-100>,
            "strengths": ["skill1", "skill2"],
            "weaknesses": ["missing_skill1", "missing_skill2"],
            "suggestions": ["suggestion1", "suggestion2"]
        }}
        """
        
        response = await self.model.generate_content(prompt)
        return self.parse_analysis_response(response.text)
    
    async def generate_tailored_cv(self, cv_content: str, job_description: str, template: str):
        """Generate tailored CV for specific job"""
        prompt = f"""
        Tailor the following CV for the job description using template {template}:
        
        Original CV:
        {cv_content}
        
        Job Description:
        {job_description}
        
        Generate a tailored CV that:
        1. Uses keywords from the job description
        2. Highlights relevant experience
        3. Follows the specified template
        4. Optimizes for ATS systems
        """
        
        response = await self.model.generate_content(prompt)
        return response.text
```

## 8. Security Considerations

### Authentication & Authorization
- JWT tokens with short expiration (15 minutes)
- Refresh tokens for long-term sessions
- Role-based access control
- Rate limiting on API endpoints

### Data Protection
- All sensitive data encrypted at rest
- HTTPS for all communications
- Input validation and sanitization
- SQL injection prevention via ORM

### LinkedIn Integration Security
- OAuth 2.0 with PKCE
- Secure token storage
- Regular token refresh
- Minimal scope permissions

## 9. Performance Optimization

### Caching Strategy
- Redis for session storage
- Job recommendations cached for 1 hour
- CV analysis results cached for 24 hours
- Static assets cached with CDN

### Database Optimization
- Proper indexing on frequently queried columns
- Connection pooling
- Query optimization
- Regular maintenance

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- Service worker for offline capability
- Bundle size optimization

## 10. Deployment Architecture

### Development Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (localhost:3000) │◄──►│   (localhost:8000) │◄──►│   (localhost:5432) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Production Environment
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CDN/Static    │    │   Load Balancer │    │   PostgreSQL    │
│   (Cloudflare)  │    │   (Nginx)       │    │   (RDS)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Application   │
                       │   (Docker)      │
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   Redis Cache   │
                       │   (ElastiCache)  │
                       └─────────────────┘
```

## 11. Monitoring & Logging

### Application Monitoring
- Error tracking with Sentry
- Performance monitoring with New Relic
- Custom metrics for business KPIs
- Health check endpoints

### Logging Strategy
- Structured logging with JSON format
- Log levels: DEBUG, INFO, WARNING, ERROR
- Centralized log aggregation
- Audit trails for sensitive operations 