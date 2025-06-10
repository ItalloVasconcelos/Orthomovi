import React, { createContext, useContext, ReactNode, useCallback } from 'react';
import { User } from '@/services/graphqlService'; // Sua interface de usuário
import keycloak from '@/services/keycloak'; // Sua instância do Keycloak

// Interface para os dados que esperamos do token do Keycloak
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

// O que o nosso contexto vai fornecer para a aplicação
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  token: string | null;
  login: () => void;
  logout: () => void;
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
  // REMOVIDO: Não usamos mais useState para 'user' ou 'loading' aqui.
  // A única fonte da verdade é o objeto 'keycloak'.
  // O 'loading' inicial já é tratado pelo KeycloakProvider.

  // --- DERIVAÇÃO DE ESTADO ---
  // Em vez de salvar o estado, nós o derivamos diretamente do objeto keycloak a cada renderização.
  // Isso garante que os dados estejam sempre sincronizados.

  const isAuthenticated = keycloak.authenticated ?? false;
  const token = keycloak.token ?? null;
  const tokenParsed = keycloak.tokenParsed as KeycloakTokenParsed | undefined;

  // Transforma os dados brutos do token na nossa interface de 'User'
  const user: User | null = isAuthenticated && tokenParsed
      ? {
        id: tokenParsed.sub,
        fullname: tokenParsed.name || 'Usuário',
        email: tokenParsed.email || '',
        // phone: tokenParsed.phone_number, // Supondo que você configurou 'phone_number' no Keycloak
        role: keycloak.hasResourceRole('app_admin', 'orthomovi') ? 'app_admin' : 'user',
      }
      : null;

  // A maneira correta e segura de verificar a role de um cliente específico no Keycloak
  const isAdmin = keycloak.hasResourceRole('app_admin', 'orthomovi');

  // --- FUNÇÕES DE AÇÃO ---
  // As funções de login e logout agora são apenas apelidos para as funções do Keycloak.
  // Usamos useCallback para garantir que a referência da função não mude a cada renderização.

  const login = useCallback(() => {
    keycloak.login({ redirectUri: window.location.origin });
  }, []);

  const logout = useCallback(() => {
    if (keycloak.authenticated) {
      // Limpa os tokens do objeto keycloak na memória do navegador
      keycloak.clearToken();
      // SÓ DEPOIS, inicia o processo de redirecionamento de logout
      keycloak.logout({ redirectUri: window.location.origin });
    }
  }, []);

  // O valor que será compartilhado com toda a aplicação
  const value = {
    isAuthenticated,
    user,
    isAdmin,
    token,
    login,
    logout,
  };

  console.log('Estado atualizado do AuthContext:', value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};