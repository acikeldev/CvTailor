# CVTailor Setup Guide

This guide will help you set up the CVTailor project for development.

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.11+ (for backend)
- **PostgreSQL** 15+ (already installed via Homebrew)
- **Redis** 7+ (for caching and sessions)

## Quick Start

### 1. Install Redis

```bash
# Install Redis via Homebrew
brew install redis

# Start Redis service
brew services start redis
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp env.example .env

# Edit .env file with your configuration
# - Set your PostgreSQL connection string
# - Add your Google Gemini API key
# - Configure LinkedIn OAuth credentials

# Initialize database (when ready)
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:8000" > .env

# Start the development server
npm run dev
```

## Environment Configuration

### Backend (.env)

```env
# Database Configuration
DATABASE_URL=postgresql://localhost/cvtailor

# Redis Configuration
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
LINKEDIN_REDIRECT_URI=http://localhost:8000/api/auth/linkedin/callback

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# File Upload
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=.pdf,.docx,.txt

# Application Settings
DEBUG=true
ALLOWED_HOSTS=["http://localhost:3000","http://localhost:5173"]
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

## API Keys Setup

### Google Gemini API

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add the key to your backend `.env` file

### LinkedIn OAuth

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Configure OAuth 2.0 settings
4. Add the client ID and secret to your backend `.env` file

## Development Workflow

### Backend Development

```bash
# Start backend server
cd backend
source venv/bin/activate
uvicorn app.main:app --reload

# Run tests
pytest

# Create database migration
alembic revision --autogenerate -m "Description of changes"
alembic upgrade head
```

### Frontend Development

```bash
# Start frontend server
cd frontend
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
cvtailor/
├── docs/                    # Documentation
│   ├── product-specification.md
│   ├── architectural-design.md
│   └── development-roadmap.md
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration and utilities
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── requirements.txt
│   └── alembic.ini
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── stores/         # Zustand stores
│   │   └── types/          # TypeScript types
│   └── package.json
└── README.md
```

## API Documentation

Once the backend is running, you can access:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

## Common Issues

### PostgreSQL Connection Issues

```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Start PostgreSQL if not running
brew services start postgresql@15

# Test connection
psql -d cvtailor -c "SELECT version();"
```

### Redis Connection Issues

```bash
# Check if Redis is running
brew services list | grep redis

# Start Redis if not running
brew services start redis

# Test connection
redis-cli ping
```

### Frontend Build Issues

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
```

## Next Steps

1. **Set up the MCP LinkedIn server** based on the mcp-linkedin repository
2. **Implement the core features** following the development roadmap
3. **Add tests** for both frontend and backend
4. **Set up CI/CD** for automated testing and deployment
5. **Configure production environment** with proper security settings

## Support

For issues and questions:
1. Check the documentation in the `docs/` folder
2. Review the development roadmap
3. Create an issue in the project repository 