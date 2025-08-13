import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Login page allows the user to authenticate into the application.
 */
export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-title">Sign in to Minimal Todo</div>
      <div className="auth-subtitle">Welcome back. Please enter your details.</div>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Email</div>
          <input
            className="input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Password</div>
          <input
            className="input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>
        {error ? <div style={{ color: '#E53935' }} role="alert">{error}</div> : null}
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      <div style={{ marginTop: 10 }}>
        New here? <Link className="link" to="/register">Create an account</Link>
      </div>
    </div>
  );
}
