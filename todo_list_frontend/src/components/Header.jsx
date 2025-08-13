import React from 'react';
import { APP_NAME } from '../config';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Header displays the app title and user actions (add task, logout).
 */
export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  const initials = (user?.name || user?.email || '?')
    .split('@')[0]
    .split(' ')
    .map(s => s[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <header className="app-header" role="banner">
      <div className="brand" aria-label={`${APP_NAME} header`}>
        <div className="brand-mark" aria-hidden="true" />
        <div className="brand-title">{APP_NAME}</div>
      </div>
      <div className="header-actions">
        {isAuthenticated ? (
          <div className="user-badge" title={user?.email || user?.name || 'User'}>
            <span className="user-initials">{initials || 'U'}</span>
            <span>{user?.email || user?.name || 'User'}</span>
            <button type="button" className="btn" onClick={logout} aria-label="Logout">
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
