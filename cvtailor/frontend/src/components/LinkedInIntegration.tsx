import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline: string;
  summary: string;
  location: string;
  industry: string;
  profilePicture: string;
}

interface LinkedInExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
}

interface LinkedInSkill {
  name: string;
  endorsements: number;
}

const LinkedInIntegration: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<LinkedInProfile | null>(null);
  const [experience, setExperience] = useState<LinkedInExperience[]>([]);
  const [skills, setSkills] = useState<LinkedInSkill[]>([]);
  const [cvContent, setCvContent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [linkedinToken, setLinkedinToken] = useState<string | null>(null);

  // Listen for access token from popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "http://localhost:5173") return;
      if (event.data.type === "LINKEDIN_TOKEN") {
        localStorage.setItem("linkedin_access_token", event.data.token);
        setLinkedinToken(event.data.token);
        // Optionally, trigger analysis after login
        analyzeProfile(event.data.token);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const connectLinkedIn = () => {
    const width = 600, height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    window.open(
      "http://localhost:8000/auth/linkedin/login",
      "LinkedInLogin",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const loadLinkedInData = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // Load profile data
      const profileResponse = await fetch('http://localhost:8000/linkedin/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const profileData = await profileResponse.json();
      
      if (profileData.success) {
        setProfile(profileData.profile);
      }

      // Load experience
      const experienceResponse = await fetch('http://localhost:8000/linkedin/experience', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const experienceData = await experienceResponse.json();
      setExperience(experienceData.experience || []);

      // Load skills
      const skillsResponse = await fetch('http://localhost:8000/linkedin/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const skillsData = await skillsResponse.json();
      setSkills(skillsData.skills || []);

    } catch {
      setError('Failed to load LinkedIn data');
    } finally {
      setIsLoading(false);
    }
  };

  const generateCV = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:8000/linkedin/generate-cv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      setCvContent(result.cv_content || '');
    } catch {
      setError('Failed to generate CV from LinkedIn');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectLinkedIn = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:8000/linkedin/disconnect', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setIsConnected(false);
        setProfile(null);
        setExperience([]);
        setSkills([]);
        setCvContent('');
      }
    } catch {
      setError('Failed to disconnect LinkedIn');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo analysis function (replace with real backend call if needed)
  const analyzeProfile = async (token?: string) => {
    setIsAnalyzing(true);
    setAnalysis(null);
    try {
      // Simulate a short analysis (demo)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAnalysis({
        match_score: 80,
        strengths: ['Demo: Good experience', 'Demo: Strong skills'],
        improvements: ['Demo: Add more certifications'],
        info: 'This is a demo analysis using MCP and Gemini.'
      });
    } catch {
      setAnalysis({ error: 'Failed to analyze profile' });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="linkedin-integration">
      <h2>LinkedIn Integration</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!isConnected ? (
        <div className="connect-section">
          <p>Connect your LinkedIn account to import your profile data and generate CVs automatically.</p>
          <button 
            onClick={connectLinkedIn}
            disabled={isLoading}
            className="connect-button"
          >
            {isLoading ? 'Connecting...' : 'Connect LinkedIn Account'}
          </button>
        </div>
      ) : (
        <div className="linkedin-data">
          <div className="header-actions">
            <h3>LinkedIn Profile</h3>
            <button 
              onClick={disconnectLinkedIn}
              disabled={isLoading}
              className="disconnect-button"
            >
              Disconnect
            </button>
          </div>

          {profile && (
            <div className="profile-section">
              <h4>Profile Information</h4>
              <div className="profile-info">
                <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Headline:</strong> {profile.headline}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Industry:</strong> {profile.industry}</p>
                <p><strong>Summary:</strong> {profile.summary}</p>
              </div>
            </div>
          )}

          {experience.length > 0 && (
            <div className="experience-section">
              <h4>Work Experience</h4>
              <div className="experience-list">
                {experience.map((exp) => (
                  <div key={exp.id} className="experience-item">
                    <h5>{exp.title}</h5>
                    <p><strong>Company:</strong> {exp.company}</p>
                    <p><strong>Location:</strong> {exp.location}</p>
                    <p><strong>Duration:</strong> {exp.startDate} - {exp.endDate || 'Present'}</p>
                    <p><strong>Description:</strong> {exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills.length > 0 && (
            <div className="skills-section">
              <h4>Skills</h4>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.name} ({skill.endorsements})
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="cv-generation">
            <h4>CV Generation</h4>
            <button 
              onClick={generateCV}
              disabled={isLoading}
              className="generate-cv-button"
            >
              {isLoading ? 'Generating...' : 'Generate CV from LinkedIn'}
            </button>
            
            {cvContent && (
              <div className="cv-content">
                <h5>Generated CV Content:</h5>
                <pre>{cvContent}</pre>
              </div>
            )}
          </div>
          <button onClick={analyzeProfile} disabled={isAnalyzing} className="generate-cv-button">
            {isAnalyzing ? 'Analyzing...' : 'Analyze My Profile'}
          </button>
          {isAnalyzing && <LoadingSpinner />}
          {isAnalyzing && <div>Analyzing your profile, please wait...</div>}
          {analysis && !isAnalyzing && (
            <div className="analysis-result">
              <h3>Profile Analysis (Demo)</h3>
              <p>Match Score: {analysis.match_score}</p>
              <p>Strengths: {analysis.strengths.join(', ')}</p>
              <p>Improvements: {analysis.improvements.join(', ')}</p>
              <p>{analysis.info}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedInIntegration; 