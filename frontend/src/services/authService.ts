import api from './api';

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    userType: 'client' | 'accountant';
  };
  requiresTwoFactor?: boolean;
  tempSession?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'accountant';
  document: string;
}

export const authService = {
  login: async (email: string, password: string, userType: 'client' | 'accountant'): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, password, userType });
    return response.data;
  },

  verifyTwoFactor: async (tempSession: string, code: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/verify-2fa', { tempSession, code });
    return response.data;
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/auth/refresh-token', { refreshToken });
    return response.data;
  },
};