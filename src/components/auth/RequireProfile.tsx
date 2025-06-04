import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsProfileComplete, selectIsProfileLoading } from '@/features/profile/profileSlice';
import { useAuth } from '@/hooks/useAuth';

interface RequireProfileProps {
  children: React.ReactNode;
}

export default function RequireProfile({ children }: RequireProfileProps) {
  const location = useLocation();
  const { user } = useAuth();
  const isProfileComplete = useSelector(selectIsProfileComplete);
  const isLoading = useSelector(selectIsProfileLoading);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isProfileComplete && location.pathname !== '/profile/complete') {
    return <Navigate to="/profile/complete" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 