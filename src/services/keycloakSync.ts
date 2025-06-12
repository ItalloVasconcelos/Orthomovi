// Importe a instância do keycloak que você já tem configurada na sua aplicação
import keycloak from './keycloak';

// A mutação GraphQL, agora sem referenciar o campo 'role' no retorno.
const  SYNC_USER_MUTATION = `
  mutation SyncKeycloakUser($email: String!, $fullname: String!, $phone: String) {
    insert_users_one(
      object: {
        email: $email,
        fullname: $fullname,
        phone: $phone
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
    }
  }
`;

// Interface para os dados do usuário, agora sem a propriedade 'role'.
interface SyncUserData {
  id: string;
  email: string;
  fullname: string;
  phone?: string;
}

// Interface para os dados que vêm do token do Keycloak (sem alteração aqui)
interface KeycloakTokenParsed {
  sub: string;
  email?: string;
  name?: string;
  phone_number?: string;
  preferred_username?: string;
}

/**
 * Executa a mutação no Hasura usando o token de acesso do usuário para autorização.
 * Esta função permanece a mesma, pois sua lógica é agnóstica à coluna 'role'.
 * @param {string} token - O token de acesso (JWT) do Keycloak.
 * @param {object} variables - As variáveis para a mutação GraphQL.
 * @returns {Promise<any>}
 */
const executeSyncMutationWithUserToken = async (token: string, variables: any) => {
  const API_URL = 'https://orthomovi-hasura.t2wird.easypanel.host/v1/graphql';

  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`, // A autenticação segura continua aqui
    'x-hasura-hole': 'app_admin'
  };

  console.log(keycloak.token)

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query: SYNC_USER_MUTATION,
        variables,
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error('Erros da API do Hasura:', result.errors);
      throw new Error(result.errors[0].message);
    }

    console.log('Dados retornados pelo Hasura:', result.data);
    return result.data;

  } catch (error) {
    console.error('Erro ao executar a mutação de sincronização:', error);
    throw error;
  }
};

export const keycloakSyncService = {
  /**
   * Sincroniza o usuário logado no Keycloak com o banco de dados do Hasura.
   */
  async syncUserWithDatabase(): Promise<SyncUserData | null> {
    if (!keycloak.authenticated || !keycloak.token || !keycloak.tokenParsed) {
      console.log('Usuário não autenticado ou token indisponível. Sincronização cancelada.');
      return null;
    }

    try {
      const tokenData = keycloak.tokenParsed as KeycloakTokenParsed;
      console.log('Iniciando sincronização para o usuário:', tokenData.email);

      const variables = {
        email: tokenData.email || '',
        fullname: tokenData.name || tokenData.preferred_username || 'Usuário sem nome',
        phone: tokenData.phone_number || null,
      };

      const result = await executeSyncMutationWithUserToken(keycloak.token, variables);

      const syncedUser = result?.insert_users_one;
      if (syncedUser) {
        console.log('✅ Usuário sincronizado com o banco de dados com sucesso!');
        return syncedUser as SyncUserData;
      }

      return null;
    } catch (error) {
      console.error('❌ Falha ao sincronizar usuário com o banco de dados:', error);
      return null;
    }
  },
};
