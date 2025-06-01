import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

type User = {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'accountant';
  profileImage?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: 'client' | 'accountant') => Promise<void>;
  register: (name: string, email: string, password: string, userType: 'client' | 'accountant', document: string) => Promise<void>;
  logout: () => void;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        
        if (token) {
          // In a real app, verify the token with the server
          // For now, we'll simulate getting the user data
          const userData = await authService.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Session expired. Please login again.');
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string, userType: 'client' | 'accountant') => {
    try {
      setIsLoading(true);
      setError(null);
      
      // In a real app, this would make an API call
      const result = await authService.login(email, password, userType);
      
      if (result.requiresTwoFactor) {
        // Handle 2FA flow
        localStorage.setItem('temp_session', result.tempSession);
        return; // Return early - user needs to complete 2FA
      }
      
      localStorage.setItem('token', result.token);
      setUser(result.user);
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyTwoFactor = async (code: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const tempSession = localStorage.getItem('temp_session');
      if (!tempSession) {
        throw new Error('Two-factor authentication session expired');
      }
      
      const result = await authService.verifyTwoFactor(tempSession, code);
      localStorage.removeItem('temp_session');
      localStorage.setItem('token', result.token);
      setUser(result.user);
      return true;
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    userType: 'client' | 'accountant',
    document: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await authService.register(name, email, password, userType, document);
      
      localStorage.setItem('token', result.token);
      setUser(result.user);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        isAuthenticated: !!user,
        login, 
        register, 
        logout,
        verifyTwoFactor,
        error,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};