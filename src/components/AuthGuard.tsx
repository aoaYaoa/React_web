import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const username = useUserStore(state => state.username);
  const location = useLocation();

  if (!username) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
} 