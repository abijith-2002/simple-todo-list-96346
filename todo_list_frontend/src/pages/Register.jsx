import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Register page allows the user to create a new account.
 */
export default function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    setPending(true);
    setError('');
    try {
      await register(name, email, password);
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-title">Create your account</div>
      <div className="auth-subtitle">Join Minimal Todo and get productive.</div>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>Name</div>
          <input
            className="input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>
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
          {pending ? 'Creating account...' : 'Create account'}
        </button>
      </form>
      <div style={{ marginTop: 10 }}>
        Already have an account? <Link className="link" to="/login">Sign in</Link>
      </div>
    </div>
  );
}
