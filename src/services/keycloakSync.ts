
import { graphqlService } from './graphqlService';
import keycloak from './keycloak';

interface KeycloakUser {
  sub: string;
  email?: string;
  name?: string;
  phone_number?: string;
  preferred_username?: string;
}

interface SyncUserData {
  id: string;
  email: string;
  fullname: string;
  phone?: string;
  password?: string;
}

const SYNC_USER_MUTATION = `
  mutation SyncKeycloakUser($id: uuid!, $email: String!, $fullname: String!, $phone: String, $password: String) {
    insert_users_one(
      object: {
        id: $id,
        email: $email,
        fullname: $fullname,
        phone: $phone,
        password: $password,
        role: "user"
      },
      on_conflict: {
        constraint: users_pkey,
        update_columns: [email, fullname, phone]
      }
    ) {
      id
      email
      fullname
      phone
      role
    }
  }
`;

const executeKeycloakSyncMutation = async (query: string, variables: any) => {
  const API_URL = 'https://orthomovi-hasura.t2wird.easypanel.host/v1/graphql';
  const headers = {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'mysecretkey',
  };

  try {
    console.log('Executando sincronização Keycloak:', variables);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Resultado da sincronização:', result);

    if (result.errors) {
      console.error('Erros da API:', result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error('Erro na sincronização:', error);
    throw error;
  }
};

export const keycloakSyncService = {
  async syncUserWithDatabase(password?: string): Promise<SyncUserData | null> {
    if (!keycloak.authenticated || !keycloak.tokenParsed) {
      console.log('Usuário não autenticado no Keycloak');
      return null;
    }

    try {
      const tokenData = keycloak.tokenParsed as KeycloakUser;
      console.log('Dados do token Keycloak:', tokenData);

      // Extrair informações do token
      const userData: SyncUserData = {
        id: tokenData.sub,
        email: tokenData.email || '',
        fullname: tokenData.name || tokenData.preferred_username || '',
        phone: tokenData.phone_number,
        password: password
      };

      console.log('Dados do usuário para sincronização:', userData);

      // Sincronizar com o banco de dados
      const result = await executeKeycloakSyncMutation(SYNC_USER_MUTATION, {
        id: userData.id,
        email: userData.email,
        fullname: userData.fullname,
        phone: userData.phone || null,
        password: userData.password || null
      });

      const syncedUser = result?.insert_users_one;
      if (syncedUser) {
        console.log('Usuário sincronizado com sucesso:', syncedUser);
        return {
          ...syncedUser,
          role: syncedUser.role || 'user'
        };
      }

      return null;
    } catch (error) {
      console.error('Erro ao sincronizar usuário:', error);
      throw error;
    }
  },

  async getUserFromKeycloak(): Promise<KeycloakUser | null> {
    if (!keycloak.authenticated || !keycloak.tokenParsed) {
      return null;
    }

    return keycloak.tokenParsed as KeycloakUser;
  }
};
