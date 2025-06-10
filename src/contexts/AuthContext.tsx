// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { User } from '@/services/graphqlService';
import { useKeycloakContext } from './KeycloakProvider';
import { keycloakSyncService } from '@/services/keycloakSync';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
}
interface KeycloakTokenParsed { sub: string; name?: string; email?: string; }

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) { throw new Error('useAuth deve ser usado dentro de um AuthProvider'); }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { keycloak, initialized } = useKeycloakContext();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (!initialized) return;

    const handleAuth = async () => {
      const authenticated = keycloak.authenticated ?? false;
      setIsAuthenticated(authenticated);

      if (authenticated && keycloak.tokenParsed) {
        console.log("AuthProvider: Usuário autenticado. Criando perfil e sincronizando...");
        const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsed;
        const isAdmin = keycloak.hasResourceRole('app_admin', 'orthomovi');
        const userProfile: User = {
          id: tokenParsed.sub,
          fullname: tokenParsed.name || 'Usuário',
          email: tokenParsed.email || '',
          role: isAdmin ? 'app_admin' : 'user',
        };
        setUser(userProfile);
        keycloakSyncService.syncUserWithDatabase().catch(err => {
          console.error("AuthProvider: Sincronização em segundo plano falhou.", err);
        });
      } else {
        console.log("AuthProvider: Usuário não autenticado.");
        setUser(null);
      }
    };

    keycloak.onAuthSuccess = handleAuth;
    keycloak.onAuthRefreshSuccess = handleAuth;
    keycloak.onAuthLogout = handleAuth;
    keycloak.onTokenExpired = () => keycloak.updateToken(30).catch(() => keycloak.logout());

    handleAuth(); // Executa uma vez na inicialização

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onAuthRefreshSuccess = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, [initialized, keycloak]);

  const login = useCallback(() => { keycloak.login(); }, [keycloak]);
  const logout = useCallback(() => { keycloak.logout(); }, [keycloak]);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    isAdmin: user?.role === 'app_admin',
    token: keycloak.token,
    login,
    logout,
  }), [isAuthenticated, user, keycloak.token, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};