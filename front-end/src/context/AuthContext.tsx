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
  register: (userData: Client | Business, role: 'client' | 'professionnel') => Promise<{ success: boolean; message: string }>;
  successMessage: string;
  setSuccessMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); 
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const storedToken = localStorage.getItem('authToken');

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.role === 'business') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('authToken');
          setCurrentUser(null);
          setToken(null);
          setIsAuthenticated(false);
        } else {
          setCurrentUser(parsedUser);
          setToken(storedToken);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données du localStorage', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (user: User, token: string) => {
    try {
      setCurrentUser(user);
      setToken(token);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', token);
      setSuccessMessage('Connexion réussie !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la session', error);
    }
  };

  const register = async (
    userData: Client | Business,
    role: 'client' | 'professionnel'
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const endpoint = role === 'professionnel' ? 'businessregister' : 'clientregister';

      const response = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Inscription réussie !');
        return { success: true, message: data.message || 'Inscription réussie !' };
      } else {
        return { success: false, message: data.message || 'Erreur lors de l’inscription' };
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      return { success: false, message: 'Erreur d’inscription, veuillez réessayer.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    setSuccessMessage('');
  };

  const authContextValue = useMemo<AuthContextType>(() => ({
    currentUser,
    isAuthenticated,
    token,
    login,
    logout,
    register,
    successMessage,
    setSuccessMessage,
    isLoading
  }), [currentUser, token, isAuthenticated, isLoading, successMessage]);

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
