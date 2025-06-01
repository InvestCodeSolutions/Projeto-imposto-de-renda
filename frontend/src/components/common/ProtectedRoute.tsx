import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

type ProtectedRouteProps = {
  children: React.ReactNode;
  userType: 'client' | 'accountant' | 'any';
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login\" replace />;
  }

  // If userType is 'any', allow access to both client and accountant
  if (userType === 'any') {
    return <>{children}</>;
  }

  // Otherwise, check if the user type matches the required type
  if (user?.userType !== userType) {
    // Redirect clients to client dashboard and accountants to accountant dashboard
    const redirectPath = user?.userType === 'client' ? '/dashboard' : '/accountant/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;