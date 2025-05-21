import React, { createContext, useContext, useState, useEffect } from 'react';

// Define auth context types
type AuthUser = {
  id: string;
  address?: string;
  email?: string;
  name?: string;
  isAuthenticated: boolean;
};

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  loginWithWallet: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  loginWithWallet: async () => {},
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function SimpleAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on load
  useEffect(() => {
    const checkSession = () => {
      try {
        const savedUser = localStorage.getItem('auth_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Error checking session:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Mock login function
  const login = async (email: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: AuthUser = {
        id: `user_${Date.now()}`,
        email,
        isAuthenticated: true,
      };
      
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError('Login failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock wallet login
  const loginWithWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: AuthUser = {
        id: `user_${Date.now()}`,
        address: '0x' + Array(40).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join(''),
        isAuthenticated: true,
      };
      
      localStorage.setItem('auth_user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (err) {
      setError('Wallet login failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout
  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem('auth_user');
      setUser(null);
    } catch (err) {
      setError('Logout failed');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        loginWithWallet,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
} 