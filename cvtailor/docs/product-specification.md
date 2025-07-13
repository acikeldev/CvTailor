# CVTailor - Product Specification

## 1. Vision & Mission

**Vision**: Empower job seekers with AI-driven tools to optimize their LinkedIn job search, CV analysis, and application process.

**Mission**: Create an intelligent platform that automates job discovery, analyzes CV-job fit, provides dynamic CV tailoring, and tracks applications seamlessly.

## 2. Target Audience

- **Primary**: Active job seekers on LinkedIn (25-45 years old)
- **Secondary**: Career changers, recent graduates, professionals seeking advancement
- **Tertiary**: HR professionals and recruiters (future expansion)

## 3. Core Features

### F1: LinkedIn Integration & Job Discovery
- Secure OAuth 2.0 connection to user's LinkedIn account
- Automatic fetching of personalized job recommendations
- Real-time job search with filters (location, role, experience level)
- Job bookmarking and organization

### F2: AI-Powered CV & Job Analysis
- CV upload and parsing (PDF, DOCX, TXT formats)
- Intelligent extraction of skills, experience, and education
- Job-CV match scoring (0-100%)
- Detailed analysis:
  - **Strengths**: Highlight matching skills and experience
  - **Weaknesses**: Identify missing requirements
  - **Gap Analysis**: Skills and experience gaps
  - **Keyword Optimization**: Missing keywords from job description

### F3: Dynamic CV Tailoring
- Modern, professional CV templates (10+ templates)
- AI-powered CV customization:
  - Keyword optimization for ATS systems
  - Experience rephrasing to match job requirements
  - Skills prioritization based on job description
  - Custom summary/objective generation
- One-click CV generation for specific jobs
- Export in multiple formats (PDF, DOCX)

### F4: Application Tracking
- Centralized dashboard for all job applications
- Status tracking (Interested, Applied, Interviewing, Offer, Rejected)
- Notes and reminders for each application
- Interview preparation tools
- Application statistics and insights

### F5: Analytics & Insights
- Application success rate tracking
- Skills gap analysis over time
- Job market trends for user's field
- Salary range insights
- Interview performance analytics

## 4. User Journey

### Onboarding Flow
1. User signs up with email/password
2. Connects LinkedIn account via OAuth
3. Uploads primary CV
4. Completes profile setup (preferences, target roles)
5. Views personalized dashboard

### Daily Usage Flow
1. User opens dashboard
2. Reviews new job recommendations
3. Clicks on interesting job
4. Views AI analysis (match score, strengths/weaknesses)
5. Generates tailored CV if interested
6. Applies to job on LinkedIn
7. Updates application status in tracker

## 5. Technical Requirements

### Frontend (React + Vite)
- Modern, responsive UI
- Real-time updates
- Offline capability for basic features
- Progressive Web App (PWA) features

### Backend (Python)
- FastAPI for REST API
- SQLAlchemy for database operations
- Celery for background tasks
- Redis for caching and session management

### AI Integration
- Google Gemini API for CV analysis and generation
- Custom MCP (Model Context Protocol) server for LinkedIn integration
- Intelligent prompt engineering for consistent results

### Database
- PostgreSQL for user data, applications, and analytics
- Redis for caching and session management

## 6. Success Metrics

### User Engagement
- Daily Active Users (DAU)
- Time spent on platform
- CV generations per user
- Applications submitted per user

### Business Metrics
- User retention rate (30-day, 90-day)
- Conversion rate (free to premium)
- Job application success rate
- User satisfaction score

### Technical Metrics
- API response time (< 200ms)
- CV generation time (< 30 seconds)
- System uptime (> 99.9%)
- Error rate (< 1%)

## 7. Monetization Strategy

### Freemium Model
- **Free Tier**: 5 CV generations/month, basic job tracking
- **Premium Tier**: Unlimited CV generations, advanced analytics, priority support
- **Enterprise Tier**: Team features, advanced reporting, API access

### Pricing
- **Free**: $0/month
- **Premium**: $9.99/month
- **Enterprise**: $49.99/month per user

## 8. Development Phases

### Phase 1 (MVP - 8 weeks)
- Basic LinkedIn integration
- CV upload and parsing
- Simple CV-job analysis
- Basic CV templates
- Application tracking

### Phase 2 (Enhancement - 6 weeks)
- Advanced AI analysis
- Dynamic CV tailoring
- Analytics dashboard
- Premium features

### Phase 3 (Scale - 4 weeks)
- Performance optimization
- Advanced analytics
- Mobile app
- API for third-party integrations

## 9. Risk Assessment

### Technical Risks
- LinkedIn API changes or restrictions
- AI API rate limits and costs
- Data privacy and security concerns

### Business Risks
- Competition from established players
- User adoption challenges
- LinkedIn policy changes

### Mitigation Strategies
- Diversify data sources beyond LinkedIn
- Implement robust error handling
- Regular security audits
- Strong user feedback loop 