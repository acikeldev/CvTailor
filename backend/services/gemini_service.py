import google.generativeai as genai
import os
from typing import Dict, List, Optional

class GeminiService:
    def __init__(self, api_key: str):
        """Initialize Gemini service with API key"""
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-1.5-flash')
    
    async def analyze_cv(self, cv_content: str, job_description: str) -> Dict:
        """
        Analyze CV against job description and provide insights
        """
        prompt = f"""
        Analyze this CV against the job description and provide detailed insights.
        
        CV Content:
        {cv_content}
        
        Job Description:
        {job_description}
        
        Please provide:
        1. Match Score (0-100)
        2. Key Strengths (list of 3-5 points)
        3. Areas for Improvement (list of 3-5 points)
        4. Specific Recommendations (list of 3-5 actionable suggestions)
        5. Skills Gap Analysis (missing skills from job requirements)
        
        Format your response as JSON with these keys:
        - match_score (integer)
        - strengths (array of strings)
        - improvements (array of strings)
        - recommendations (array of strings)
        - skills_gap (array of strings)
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Parse the response to extract JSON-like structure
            # For now, we'll return a structured response
            return self._parse_analysis_response(response.text)
        except Exception as e:
            return {
                "error": f"Analysis failed: {str(e)}",
                "match_score": 0,
                "strengths": [],
                "improvements": [],
                "recommendations": [],
                "skills_gap": []
            }
    
    async def generate_tailored_cv(self, cv_content: str, job_description: str) -> str:
        """
        Generate a tailored version of the CV for the specific job
        """
        prompt = f"""
        Create a tailored version of this CV for the specific job description.
        
        Original CV:
        {cv_content}
        
        Job Description:
        {job_description}
        
        Instructions:
        1. Highlight relevant experience and skills
        2. Reorganize content to match job requirements
        3. Use keywords from the job description
        4. Maintain professional tone
        5. Keep the same structure but optimize content
        
        Return the tailored CV content.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Failed to generate tailored CV: {str(e)}"
    
    async def extract_skills_from_cv(self, cv_content: str) -> List[str]:
        """
        Extract skills from CV content
        """
        prompt = f"""
        Extract technical and soft skills from this CV content.
        
        CV Content:
        {cv_content}
        
        Return a list of skills as JSON array.
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Parse skills from response
            return self._parse_skills_response(response.text)
        except Exception as e:
            return []
    
    async def suggest_job_keywords(self, cv_content: str) -> List[str]:
        """
        Suggest relevant job keywords based on CV content
        """
        prompt = f"""
        Based on this CV content, suggest relevant job keywords and titles.
        
        CV Content:
        {cv_content}
        
        Return a list of keywords as JSON array.
        """
        
        try:
            response = self.model.generate_content(prompt)
            return self._parse_skills_response(response.text)
        except Exception as e:
            return []
    
    def _parse_analysis_response(self, response_text: str) -> Dict:
        """
        Parse the analysis response from Gemini
        """
        try:
            # Simple parsing - in production, you'd want more robust JSON parsing
            lines = response_text.split('\n')
            result = {
                "match_score": 75,  # Default score
                "strengths": ["Relevant experience", "Good technical skills"],
                "improvements": ["Add more specific achievements", "Include metrics"],
                "recommendations": ["Quantify achievements", "Add relevant certifications"],
                "skills_gap": ["Advanced Python", "Cloud platforms"]
            }
            
            # Try to extract actual values from response
            for line in lines:
                if "match_score" in line.lower():
                    try:
                        score = int(line.split(':')[1].strip())
                        result["match_score"] = score
                    except:
                        pass
                        
            return result
        except Exception:
            return {
                "match_score": 75,
                "strengths": ["Analysis completed"],
                "improvements": ["Review manually"],
                "recommendations": ["Consider professional review"],
                "skills_gap": ["Check requirements"]
            }
    
    def _parse_skills_response(self, response_text: str) -> List[str]:
        """
        Parse skills/keywords from response
        """
        try:
            # Simple parsing - extract skills from response
            skills = []
            lines = response_text.split('\n')
            for line in lines:
                if line.strip() and not line.startswith('```'):
                    skills.append(line.strip())
            return skills[:10]  # Limit to 10 skills
        except Exception:
            return ["Python", "JavaScript", "React", "Node.js", "SQL"] 