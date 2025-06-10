
import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { User } from '@/services/graphqlService';
import keycloak from '@/services/keycloak';

interface KeycloakTokenParsed {
  sub: string;
  email_verified: boolean;
  name?: string;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  resource_access?: {
    [key: string]: {
      roles: string[];
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  keycloakLogin: () => void; // Adicionado para compatibilidade
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Verificar se o Keycloak foi inicializado
  const isAuthenticated = keycloak.authenticated ?? false;
  const token = keycloak.token ?? null;
  const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsed | undefined;
  
  // Loading será false se o keycloak já foi inicializado
  const loading = !keycloak.didInitialize;

  const user: User | null = isAuthenticated && tokenParsed
      ? {
        id: tokenParsed.sub,
        fullname: tokenParsed.name || 'Usuário',
        email: tokenParsed.email || '',
        role: keycloak.hasResourceRole('app_admin', 'orthomovi') ? 'app_admin' : 'user',
      }
      : null;

  const isAdmin = keycloak.hasResourceRole('app_admin', 'orthomovi');

  const login = useCallback(() => {
    if (keycloak.didInitialize) {
      keycloak.login({ redirectUri: window.location.origin });
    } else {
      console.error('Keycloak não foi inicializado ainda');
    }
  }, []);

  const keycloakLogin = useCallback(() => {
    if (keycloak.didInitialize) {
      keycloak.login({ redirectUri: window.location.origin });
    } else {
      console.error('Keycloak não foi inicializado ainda');
    }
  }, []);

  const logout = useCallback(() => {
    if (keycloak.authenticated && keycloak.didInitialize) {
      keycloak.clearToken();
      keycloak.logout({ redirectUri: window.location.origin });
    }
  }, []);

  const value = {
    isAuthenticated,
    user,
    isAdmin,
    token,
    loading,
    login,
    logout,
    keycloakLogin,
  };

  console.log('Estado do AuthContext:', {
    isAuthenticated,
    loading,
    didInitialize: keycloak.didInitialize,
    user: user ? user.email : null
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
