import React, { useState } from 'react';
import type { User } from '../types';
import LinkedInIntegration from './LinkedInIntegration';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'linkedin'>('dashboard');

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>CV Tailor Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.email}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'linkedin' ? 'active' : ''}`}
          onClick={() => setActiveTab('linkedin')}
        >
          LinkedIn Integration
        </button>
      </nav>
      
      <main className="dashboard-content">
        {activeTab === 'dashboard' ? (
          <>
            <div className="dashboard-card">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">Upload CV</button>
                <button className="action-btn">Search Jobs</button>
                <button className="action-btn">View Applications</button>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3>Recent Activity</h3>
              <p>No recent activity yet. Start by uploading your CV!</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Account Info</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Member since:</strong> {new Date().toLocaleDateString()}</p>
            </div>
          </>
        ) : (
          <LinkedInIntegration />
        )}
      </main>
    </div>
  );
} 