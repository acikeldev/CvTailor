# CVTailor

![CV Tailor Bot](assets/robot_tailor.png)

An AI-powered job search and CV optimization platform that helps job seekers discover relevant opportunities on LinkedIn, analyze their CV against job requirements, and generate tailored CVs for specific positions.

## 🚀 Features

- **LinkedIn Integration**: Connect your LinkedIn account to access personalized job recommendations
- **AI-Powered CV Analysis**: Get detailed analysis of how well your CV matches job requirements
- **Dynamic CV Tailoring**: Generate customized CVs optimized for specific job descriptions
- **Application Tracking**: Track your job applications and interview progress
- **Analytics Dashboard**: Monitor your job search performance and success rates

## 🏗️ Architecture

CVTailor is built as a monolith application with:

- **Frontend**: React 18 + Vite + TypeScript
- **Backend**: Python FastAPI
- **Database**: PostgreSQL + Redis
- **AI**: Google Gemini API
- **LinkedIn**: Custom MCP (Model Context Protocol) Server

## 📁 Project Structure

```
cvtailor/
├── docs/                    # Documentation
│   ├── product-specification.md
│   └── architectural-design.md
├── frontend/               # React + Vite application
├── backend/                # Python FastAPI application
└── README.md              # This file
```

## 🛠️ Technology Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Hook Form for forms
- Axios for HTTP requests

### Backend
- FastAPI (Python 3.11+)
- SQLAlchemy 2.0 for ORM
- Alembic for migrations
- Celery for background tasks
- Redis for caching
- JWT for authentication

### External Services
- Google Gemini API for AI features
- LinkedIn API via custom MCP server
- PostgreSQL for main database
- Redis for caching and sessions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- PostgreSQL 15+
- Redis 7+

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cvtailor
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure environment variables**
   ```bash
   # Backend (.env)
   DATABASE_URL=postgresql://user:password@localhost/cvtailor
   REDIS_URL=redis://localhost:6379
   GEMINI_API_KEY=your_gemini_api_key
   LINKEDIN_CLIENT_ID=your_linkedin_client_id
   LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
   JWT_SECRET=your_jwt_secret

   # Frontend (.env)
   VITE_API_URL=http://localhost:8000
   ```

5. **Start the development servers**
   ```bash
   # Backend (from backend directory)
   uvicorn main:app --reload

   # Frontend (from frontend directory)
   npm run dev
   ```

## 📚 Documentation

- [Product Specification](./docs/product-specification.md) - Detailed feature specifications
- [Architectural Design](./docs/architectural-design.md) - Technical architecture and implementation details

## 🔧 Development

### Backend Development

The backend is built with FastAPI and follows a clean architecture pattern:

```
backend/
├── app/
│   ├── api/              # API routes
│   ├── core/             # Configuration and utilities
│   ├── models/           # Database models
│   ├── schemas/          # Pydantic schemas
│   ├── services/         # Business logic
│   └── main.py           # Application entry point
├── tests/                # Test files
└── requirements.txt      # Python dependencies
```

### Frontend Development

The frontend uses React with TypeScript and follows modern React patterns:

```
frontend/
├── src/
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   ├── stores/          # Zustand stores
│   ├── types/           # TypeScript types
│   └── utils/           # Utility functions
├── public/              # Static assets
└── package.json         # Node.js dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [mcp-linkedin](https://github.com/adhikasp/mcp-linkedin) for LinkedIn integration inspiration
- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent Python web framework
- [React](https://reactjs.org/) for the frontend framework

## 📞 Support

For support and questions, please open an issue on GitHub or contact the development team. 