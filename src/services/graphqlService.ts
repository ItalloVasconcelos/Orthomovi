import keycloak from './keycloak'; // Supondo que você exporte sua instância do keycloak

// --- INTERFACES ATUALIZADAS ---

// A senha foi removida, pois o Keycloak gerencia isso.
export interface User {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  role?: 'app_admin' | 'user'; // Usando a role 'app_admin' do Keycloak
}

// REMOVIDAS: Estas interfaces são obsoletas, pois o Keycloak cuida do login e registro.
// export interface LoginCredentials { ... }
// export interface RegisterData { ... }

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  phone?: string;
}

// ... (Suas outras interfaces como CompanyConfig, AdminContact, etc., continuam iguais)


// --- ENGINE DE EXECUÇÃO ATUALIZADA ---

const API_URL = 'https://orthomovi-hasura.t2wird.easypanel.host/v1/graphql';

/**
 * Função central que executa qualquer operação GraphQL no Hasura,
 * utilizando o token JWT do usuário para autenticação e autorização.
 * @param query A query ou mutação em string.
 * @param token O token de acesso JWT do usuário logado.
 * @param variables As variáveis para a operação.
 * @returns Os dados retornados pela API.
 */
const executeGraphQL = async (query: string, token: string, variables?: any) => {
  // Os cabeçalhos são gerados dinamicamente em cada chamada
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`, // O token do Keycloak é usado aqui!
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('Erros retornados pela API do Hasura:', result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error('Erro na execução da requisição GraphQL:', error);
    throw error;
  }
};


// --- QUERIES E MUTATIONS REVISADAS ---

const QUERIES_AND_MUTATIONS = {
  // Query para buscar o usuário logado. Hasura usará o token para saber quem é.
  GET_CURRENT_USER: `
    query GetCurrentUser {
      users(limit: 1) { # A permissão de 'select' no Hasura garantirá que ele só retorne o próprio usuário
        id
        fullname
        email
        phone
        role
      }
    }
  `,

  // Query para um admin buscar todos os usuários.
  GET_ALL_USERS: `
    query GetAllUsers {
      users(order_by: {fullname: asc}) {
        id
        fullname
        email
        phone
        role
      }
    }
  `,

  // Mutação para o usuário logado atualizar seus próprios dados.
  // Note que não passamos o 'id', pois a permissão do Hasura cuidará disso.
  UPDATE_CURRENT_USER: `
    mutation UpdateCurrentUser($fullname: String, $email: String, $phone: String) {
      update_users(
        where: {}, # A regra de permissão "where id = X-Hasura-User-Id" será aplicada aqui pelo Hasura
        _set: {
          fullname: $fullname,
          email: $email,
          phone: $phone
        }
      ) {
        returning {
          id
          fullname
          email
          phone
          role
        }
      }
    }
  `,

  // As outras queries e mutações que você já tinha.
  // Elas não precisam de alteração na sua estrutura, pois a mudança é na forma como são chamadas (com o token).
  GET_ALL_RESULTS: `...`,
  GET_ADMIN_DATA: `...`,
  UPDATE_COMPANY_CONFIG: `...`,
  UPDATE_RESULT_STATUS: `...`,
};


// --- SERVIÇO EXPORTADO E REFATORADO ---

export const graphqlService = {
  // REMOVIDO: loginUser e registerUser são responsabilidades do Keycloak e do nosso syncService.

  /**
   * Busca os dados do usuário atualmente logado.
   * Requer um token válido.
   */
  async getCurrentUser(token: string): Promise<User | null> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_CURRENT_USER, token);
    return data?.users?.[0] || null;
  },

  /**
   * Busca todos os usuários.
   * Requer um token de um usuário com a role 'app_admin'.
   */
  async getAllUsers(token: string): Promise<User[]> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_ALL_USERS, token);
    return data?.users || [];
  },

  /**
   * Atualiza os dados do usuário logado.
   * Requer um token válido.
   */
  async updateCurrentUser(token: string, userData: UpdateUserData): Promise<User | null> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.UPDATE_CURRENT_USER, token, userData);
    const user = data?.update_users?.returning?.[0];
    return user || null;
  },

  // Suas outras funções, agora adaptadas para receber o token.
  // Lembre-se de adicionar as queries correspondentes no objeto QUERIES_AND_MUTATIONS.

  async getAllResults(token: string): Promise<any[]> { // Substitua 'any' pela sua interface Result
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_ALL_RESULTS, token);
    return data?.results || [];
  },

  async updateResultStatus(token: string, id: string, status: string): Promise<boolean> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.UPDATE_RESULT_STATUS, token, { id, status });
    return !!data?.update_results_by_pk;
  },

  async getAdminConfig(token: string): Promise<any> { // Substitua 'any' pela sua interface
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_ADMIN_DATA, token);
    // ... sua lógica para montar o objeto de retorno ...
    return data;
  },

  async updateCompanyConfig(token: string, configData: any): Promise<boolean> { // Substitua 'any'
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.UPDATE_COMPANY_CONFIG, token, configData);
    return !!data;
  },
};