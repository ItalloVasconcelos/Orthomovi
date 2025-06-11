
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { User } from '@/services/graphqlService';
import { useKeycloakContext } from './KeycloakProvider';
import { keycloakSyncService } from '@/services/keycloakSync';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isAdmin: boolean;
  token: string | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
  updateUserData: (userData: Partial<User>) => void;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!initialized) return;

    const handleAuth = async () => {
      const authenticated = keycloak.authenticated ?? false;
      setIsAuthenticated(authenticated);

      if (authenticated && keycloak.tokenParsed) {
        const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsed;
        const isAdmin = keycloak.hasResourceRole('app_admin', 'orthomovi');

        const userProfile: User = {
          id: tokenParsed.sub,
          fullname: tokenParsed.name || 'Usuário',
          email: tokenParsed.email || '',
          role: isAdmin ? 'app_admin' : 'user',
        };
        setUser(userProfile);

        console.log("AuthProvider: Usuário autenticado. Sincronizando com Hasura...");
        keycloakSyncService.syncUserWithDatabase().catch(err => {
          console.error("AuthProvider: Sincronização em segundo plano falhou.", err);
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    keycloak.onAuthSuccess = () => { setLoading(true); handleAuth(); };
    keycloak.onAuthLogout = () => { setLoading(true); handleAuth(); };
    keycloak.onTokenExpired = () => keycloak.updateToken(30).catch(() => keycloak.logout());

    handleAuth();

    return () => {
      keycloak.onAuthSuccess = undefined;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, [initialized, keycloak]);

  const login = useCallback(() => { keycloak.login(); }, [keycloak]);
  const logout = useCallback(() => {
    if(keycloak.authenticated) {
      keycloak.logout({ redirectUri: window.location.origin });
    }
  }, [keycloak]);

  const updateUserData = useCallback((userData: Partial<User>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
  }, []);

  const value = useMemo(() => ({
    isAuthenticated,
    user,
    isAdmin: keycloak.hasResourceRole('app_admin', 'orthomovi'),
    token: keycloak.token ?? null,
    loading,
    login,
    logout,
    updateUserData,
  }), [isAuthenticated, user, keycloak.token, loading, login, logout, updateUserData]);

  // Os filhos são renderizados pelo KeycloakProvider, aqui só passamos o contexto
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
