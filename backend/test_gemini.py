#!/usr/bin/env python3
"""
Test script to verify Gemini API integration
"""

import os
import asyncio
from dotenv import load_dotenv
from services.gemini_service import GeminiService

# Load environment variables
load_dotenv()

async def test_gemini_integration():
    """Test Gemini API integration"""
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ GEMINI_API_KEY not found in environment variables")
        print("Please set your Gemini API key in the .env file")
        return
    
    print("Testing Gemini API Integration")
    print("=" * 50)
    
    try:
        # Initialize Gemini service
        gemini_service = GeminiService(api_key)
        print("✅ Gemini service initialized successfully")
        
        # Test CV content
        cv_content = """
        John Doe
        Software Engineer
        
        Experience:
        - Senior Developer at Tech Corp (2020-2023)
        - Full Stack Developer at Startup Inc (2018-2020)
        
        Skills:
        - Python, JavaScript, React, Node.js
        - AWS, Docker, Kubernetes
        - Agile, Git, CI/CD
        """
        
        # Test job description
        job_description = """
        Senior Software Engineer
        
        We are looking for a Senior Software Engineer with:
        - 5+ years of experience in Python and JavaScript
        - Experience with React and Node.js
        - Knowledge of cloud platforms (AWS, Azure, GCP)
        - Experience with Docker and Kubernetes
        - Strong problem-solving skills
        - Experience with CI/CD pipelines
        
        Responsibilities:
        - Develop and maintain web applications
        - Collaborate with cross-functional teams
        - Mentor junior developers
        - Participate in code reviews
        """
        
        print("\nTesting CV Analysis...")
        analysis_result = await gemini_service.analyze_cv(cv_content, job_description)
        
        print("✅ CV Analysis completed")
        print(f"Match Score: {analysis_result.get('match_score', 'N/A')}")
        print(f"Strengths: {analysis_result.get('strengths', [])}")
        print(f"Improvements: {analysis_result.get('improvements', [])}")
        
        print("\nTesting Skills Extraction...")
        skills = await gemini_service.extract_skills_from_cv(cv_content)
        print(f"✅ Skills extracted: {skills}")
        
        print("\nTesting Job Keywords...")
        keywords = await gemini_service.suggest_job_keywords(cv_content)
        print(f"✅ Job keywords: {keywords}")
        
        print("\nTesting Tailored CV Generation...")
        tailored_cv = await gemini_service.generate_tailored_cv(cv_content, job_description)
        print("✅ Tailored CV generated")
        print(f"Length: {len(tailored_cv)} characters")
        
        print("\n🎉 All Gemini tests passed!")
        
    except Exception as e:
        print(f"❌ Gemini test failed: {str(e)}")
        print("Make sure your API key is correct and you have internet connection")

if __name__ == "__main__":
    asyncio.run(test_gemini_integration()) 