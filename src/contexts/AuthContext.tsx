
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/services/graphqlService';
import keycloak from '@/services/keycloak';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
  keycloakLogin: () => void;
  keycloakLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um usuário logado no localStorage ao inicializar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        console.log('Usuário carregado do localStorage:', userData);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('user');
      }
    }

    // Verificar autenticação do Keycloak
    if (keycloak.authenticated) {
      console.log('Usuário autenticado via Keycloak');
      // Aqui você pode criar um usuário baseado nos dados do Keycloak
      // e sincronizar com seu backend se necessário
    }

    setLoading(false);
  }, []);

  const login = (userData: User) => {
    console.log('Login realizado com usuário:', userData);
    console.log('Role do usuário:', userData.role);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const keycloakLogin = () => {
    keycloak.login({
      redirectUri: window.location.origin + '/'
    });
  };

  const keycloakLogout = () => {
    keycloak.logout({
      redirectUri: window.location.origin + '/'
    });
    logout(); // Também limpa o estado local
  };

  const isAuthenticated = !!user || keycloak.authenticated;
  const isAdmin = user?.role === 'admin';

  console.log('Estado atual do auth:', {
    user: user,
    isAuthenticated,
    isAdmin,
    userRole: user?.role,
    keycloakAuthenticated: keycloak.authenticated
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isAdmin, 
      login, 
      logout, 
      loading,
      keycloakLogin,
      keycloakLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};
