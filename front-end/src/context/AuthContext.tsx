import React, {
  useContext,
  useState,
  useEffect,
  createContext,
  ReactNode,
  useMemo
} from 'react';

import { User, Client, Business } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  register: (userData: Client | Business, role: 'client' | 'professionnel') => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // <- pour indiquer le chargement

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser && storedToken) {
        setCurrentUser(JSON.parse(storedUser));
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du localStorage', error);
    } finally {
      setIsLoading(false); // <- on arrête le chargement une fois les données traitées
    }
  }, []);

  const login = (user: User, token: string) => {
    try {
      setCurrentUser(user);
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la session', error);
    }
  };

  const register = async (
    userData: Client | Business,
    role: 'client' | 'professionnel'
  ): Promise<boolean> => {
    try {
      const endpoint = role === 'professionnel' ? 'register-entreprise' : 'register-client';

      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return true;
      } else {
        console.error(data.message || 'Erreur lors de l’inscription');
        return false;
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  const authContextValue = useMemo<AuthContextType>(() => ({
    currentUser,
    isAuthenticated,
    token,
    login,
    logout,
    register,
    isLoading
  }), [currentUser, token, isAuthenticated, isLoading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
