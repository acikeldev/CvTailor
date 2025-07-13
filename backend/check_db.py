#!/usr/bin/env python3
"""
Simple script to check the database and show all users
"""

from database import SessionLocal
from models import User

def check_database():
    """Check the database and show all users"""
    db = SessionLocal()
    try:
        # Get all users
        users = db.query(User).all()
        
        print("Database Check Results")
        print("=" * 50)
        print(f"Total users: {len(users)}")
        print()
        
        if users:
            print("Users in database:")
            print("-" * 30)
            for user in users:
                print(f"ID: {user.id}")
                print(f"Email: {user.email}")
                print(f"Active: {user.is_active}")
                print(f"Created: {user.created_at}")
                print("-" * 30)
        else:
            print("No users found in database")
            
        # Test database connection
        print("\nDatabase connection: ✅ Working")
        
    except Exception as e:
        print(f"❌ Database error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_database() 