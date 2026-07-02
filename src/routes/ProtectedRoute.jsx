import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children, allowedRole }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}