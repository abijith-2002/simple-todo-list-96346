import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthToken, getStoredToken, login as apiLogin, register as apiRegister } from '../services/apiClient';
import { APP_NAME } from '../config';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access auth state and actions. */
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides auth state to the application. */
  const navigate = useNavigateSafe();
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    // Attempt to set token on startup and mark bootstrapped
    if (token) {
      setAuthToken(token);
    }
    setBootstrapped(true);
    document.title = `${APP_NAME}`;
  }, [token]);

  // PUBLIC_INTERFACE
  const login = useCallback(async (email, password) => {
    /** Log user in and set token + user. */
    const result = await apiLogin(email, password);
    setToken(result.token);
    setAuthToken(result.token);
    setUser(result.user || { email });
    navigate('/');
  }, [navigate]);

  // PUBLIC_INTERFACE
  const register = useCallback(async (name, email, password) => {
    /** Register user and set token + user. */
    const result = await apiRegister(name, email, password);
    setToken(result.token);
    setAuthToken(result.token);
    setUser(result.user || { name, email });
    navigate('/');
  }, [navigate]);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    /** Clear auth token and user, navigate to login. */
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/login');
  }, [navigate]);

  const value = useMemo(() => ({
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
    bootstrapped
  }), [token, user, bootstrapped, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// A small helper to safely use navigate in provider
function useNavigateSafe() {
  try {
    return useNavigate();
  } catch {
    return () => {};
  }
}
