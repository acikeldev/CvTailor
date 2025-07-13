#!/usr/bin/env python3
"""
Test script to verify demo users and database connection
"""

import requests
import json

BASE_URL = "http://localhost:8001"

def test_demo_users():
    """Test the demo users that should be created on startup"""
    
    demo_users = [
        {"email": "demo@example.com", "password": "demo123"},
        {"email": "test@example.com", "password": "test123"},
        {"email": "admin@cvtailor.com", "password": "admin123"}
    ]
    
    print("Testing demo users...")
    print("=" * 50)
    
    for user in demo_users:
        print(f"\nTesting login for: {user['email']}")
        
        try:
            # Test login
            response = requests.post(
                f"{BASE_URL}/login",
                json={"email": user["email"], "password": user["password"]},
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Login successful for {user['email']}")
                print(f"   Token: {data['access_token'][:50]}...")
                
                # Test getting user info
                headers = {"Authorization": f"Bearer {data['access_token']}"}
                me_response = requests.get(f"{BASE_URL}/me", headers=headers)
                
                if me_response.status_code == 200:
                    user_info = me_response.json()
                    print(f"   User ID: {user_info['id']}")
                else:
                    print(f"❌ Failed to get user info: {me_response.status_code}")
                    
            else:
                print(f"❌ Login failed for {user['email']}: {response.status_code}")
                if response.text:
                    print(f"   Error: {response.text}")
                    
        except requests.exceptions.ConnectionError:
            print(f"❌ Could not connect to server at {BASE_URL}")
            print("Make sure the backend is running on port 8001")
            break
        except Exception as e:
            print(f"❌ Error testing {user['email']}: {str(e)}")

def test_signup():
    """Test creating a new user"""
    print("\n" + "=" * 50)
    print("Testing signup...")
    
    try:
        response = requests.post(
            f"{BASE_URL}/signup",
            json={"email": "newuser@example.com", "password": "newpass123"},
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Signup successful for newuser@example.com")
            print(f"   User ID: {data['id']}")
        else:
            print(f"❌ Signup failed: {response.status_code}")
            if response.text:
                print(f"   Error: {response.text}")
                
    except requests.exceptions.ConnectionError:
        print(f"❌ Could not connect to server at {BASE_URL}")
    except Exception as e:
        print(f"❌ Error testing signup: {str(e)}")

if __name__ == "__main__":
    print("CV Tailor Backend Test")
    print("=" * 50)
    
    # Test if server is running
    try:
        response = requests.get(f"{BASE_URL}/")
        if response.status_code == 200:
            print("✅ Server is running")
            test_demo_users()
            test_signup()
        else:
            print(f"❌ Server responded with status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"❌ Could not connect to server at {BASE_URL}")
        print("Make sure to start the backend with:")
        print("cd cvtailor/backend")
        print("source venv/bin/activate")
        print("uvicorn main:app --reload --host 0.0.0.0 --port 8001") 