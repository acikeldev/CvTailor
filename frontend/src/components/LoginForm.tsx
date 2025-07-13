import { useState } from 'react';
import type { User, LoginFormData } from '../types';
import { authService } from '../services/auth';

interface LoginFormProps {
  onSwitch: () => void;
  onLogin: (user: User) => void;
}

export function LoginForm({ onSwitch, onLogin }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const { token, user } = await authService.login(formData.email, formData.password);
      localStorage.setItem('token', token);
      onLogin(user);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
      <p>
        Don't have an account?{' '}
        <button type="button" className="link" onClick={onSwitch}>
          Sign up
        </button>
      </p>
    </div>
  );
} 