import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Todos from './pages/Todos';

/**
 * PUBLIC_INTERFACE
 * ProtectedRoute component ensures that only authenticated users can access the given route.
 * If the user is not authenticated, they will be redirected to the /login page.
 */
function ProtectedRoute({ children }) {
  /** Ensures user is authenticated; redirects if not. */
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * PUBLIC_INTERFACE
 * AppShell defines the application layout with Header and the main content area.
 * Individual pages manage their own body layout and sidebars if needed.
 */
function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * AuthOnly guards public auth pages: if user is already authenticated, redirect to dashboard.
 */
function AuthOnly({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}

/**
 * PUBLIC_INTERFACE
 * App is the main entry component that sets up providers and routes for the application.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppShell>
                  <Todos />
                </AppShell>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<AuthOnly><Login /></AuthOnly>} />
          <Route path="/register" element={<AuthOnly><Register /></AuthOnly>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
