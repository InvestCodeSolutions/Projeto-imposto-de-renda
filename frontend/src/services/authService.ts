// This is a mock service for authentication
// In a real app, this would make API calls to a backend server

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    password: 'senha123',
    userType: 'client',
  },
  {
    id: '2',
    name: 'Maria Contadora',
    email: 'maria@example.com',
    password: 'senha123',
    userType: 'accountant',
  },
];

export const authService = {
  login: async (email: string, password: string, userType: 'client' | 'accountant') => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password && u.userType === userType
    );

    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Simulate two-factor authentication requirement
    const requiresTwoFactor = false; // In a real app, this would be determined by user settings

    if (requiresTwoFactor) {
      // Return temporary session for 2FA flow
      return {
        requiresTwoFactor: true,
        tempSession: 'temp_session_' + Math.random().toString(36).substring(2),
      };
    }

    // Return user data and token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType as 'client' | 'accountant',
      },
      token: 'mock_token_' + Math.random().toString(36).substring(2),
    };
  },

  verifyTwoFactor: async (tempSession: string, code: string) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // In a real app, this would verify the code with the server
    // For this mock, we'll just check if the code is 6 digits
    if (!/^\d{6}$/.test(code)) {
      throw new Error('Código inválido');
    }

    // Find the user associated with the temp session
    // In this mock, we'll just return the first user
    const user = mockUsers[0];

    // Return user data and token
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userType: user.userType as 'client' | 'accountant',
      },
      token: 'mock_token_' + Math.random().toString(36).substring(2),
    };
  },

  register: async (
    name: string,
    email: string,
    password: string,
    userType: 'client' | 'accountant',
    document: string
  ) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check if email is already in use
    if (mockUsers.some((u) => u.email === email)) {
      throw new Error('Este email já está em uso');
    }

    // In a real app, this would create a new user in the database
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      name,
      email,
      password,
      userType,
      document,
    };

    // Return user data and token
    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        userType: newUser.userType as 'client' | 'accountant',
      },
      token: 'mock_token_' + Math.random().toString(36).substring(2),
    };
  },

  getCurrentUser: async () => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // In a real app, this would verify the token with the server
    // For this mock, we'll just return the first user
    const user = mockUsers[0];

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      userType: user.userType as 'client' | 'accountant',
    };
  },
};