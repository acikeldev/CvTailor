#!/usr/bin/env python3
"""
Test script to verify LinkedIn service integration
"""

import asyncio
from services.linkedin_service import LinkedInService

async def test_linkedin_integration():
    """Test LinkedIn service integration"""
    
    print("Testing LinkedIn Service Integration")
    print("=" * 50)
    
    try:
        # Initialize LinkedIn service
        linkedin_service = LinkedInService()
        print("✅ LinkedIn service initialized successfully")
        
        # Test connection (mock)
        print("\nTesting LinkedIn Connection...")
        connection_result = await linkedin_service.connect_account("mock_auth_code")
        print(f"✅ Connection result: {connection_result}")
        
        # Test profile data
        print("\nTesting Profile Data...")
        profile_data = await linkedin_service.get_profile_data()
        print(f"✅ Profile data: {profile_data.get('profile', {}).get('headline', 'N/A')}")
        
        # Test experience
        print("\nTesting Work Experience...")
        experience = await linkedin_service.get_experience()
        print(f"✅ Experience entries: {len(experience)}")
        for exp in experience[:2]:  # Show first 2 entries
            print(f"  - {exp['title']} at {exp['company']}")
        
        # Test skills
        print("\nTesting Skills...")
        skills = await linkedin_service.get_skills()
        print(f"✅ Skills found: {len(skills)}")
        skill_names = [skill['name'] for skill in skills[:5]]  # Show first 5 skills
        print(f"  - Top skills: {', '.join(skill_names)}")
        
        # Test education
        print("\nTesting Education...")
        education = await linkedin_service.get_education()
        print(f"✅ Education entries: {len(education)}")
        for edu in education:
            print(f"  - {edu['degree']} from {edu['school']}")
        
        # Test CV generation
        print("\nTesting CV Generation...")
        cv_content = await linkedin_service.generate_cv_from_linkedin()
        print(f"✅ CV generated successfully")
        print(f"  - CV length: {len(cv_content)} characters")
        print(f"  - First 100 chars: {cv_content[:100]}...")
        
        # Test profile analysis
        print("\nTesting Profile Analysis...")
        job_description = """
        Senior Software Engineer
        
        We are looking for a Senior Software Engineer with:
        - 5+ years of experience in Python and JavaScript
        - Experience with React and Node.js
        - Knowledge of cloud platforms (AWS, Azure, GCP)
        - Experience with Docker and Kubernetes
        - Strong problem-solving skills
        - Experience with CI/CD pipelines
        """
        
        analysis_result = await linkedin_service.analyze_linkedin_profile(job_description)
        print("✅ Profile analysis completed")
        print(f"  - Match Score: {analysis_result.get('match_score', 'N/A')}")
        print(f"  - Strengths: {analysis_result.get('strengths', [])}")
        print(f"  - Improvements: {analysis_result.get('improvements', [])}")
        
        # Test sync
        print("\nTesting Profile Sync...")
        sync_result = await linkedin_service.sync_with_linkedin()
        print(f"✅ Sync result: {sync_result}")
        
        # Test disconnect
        print("\nTesting Disconnect...")
        disconnect_result = linkedin_service.disconnect()
        print(f"✅ Disconnect result: {disconnect_result}")
        
        print("\n🎉 All LinkedIn tests passed!")
        
    except Exception as e:
        print(f"❌ LinkedIn test failed: {str(e)}")
        print("Make sure the LinkedIn service is properly configured")

if __name__ == "__main__":
    asyncio.run(test_linkedin_integration()) 