import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { User } from './types';
import { authService } from './services/auth';
import { LoginForm, SignupForm, Dashboard, LoadingSpinner } from './components';
import LinkedInCallback from './components/LinkedInCallback';
import './App.css';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser(token)
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route path="/linkedin-callback" element={<LinkedInCallback />} />
      <Route
        path="/*"
        element={
          user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : showSignup ? (
            <SignupForm onSwitch={() => setShowSignup(false)} onSignup={handleSignup} />
          ) : (
            <LoginForm onSwitch={() => setShowSignup(true)} onLogin={handleLogin} />
          )
        }
      />
    </Routes>
  );
}

export default App;
