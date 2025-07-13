# CV Tailor Backend

A FastAPI backend for the CV Tailor application with authentication endpoints.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Server

Start the development server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

- `POST /signup` - Register a new user
- `POST /login` - Login and get JWT token
- `GET /me` - Get current user info (requires authentication)
- `GET /` - Health check

## API Documentation

Once the server is running, you can view the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS middleware for frontend integration
- Input validation with Pydantic
- In-memory user storage (replace with database in production) 