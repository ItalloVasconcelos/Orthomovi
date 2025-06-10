// --- INTERFACES DE DADOS ---
export interface User {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  role?: 'app_admin' | 'user';
}

export interface Result {
  id: string;
  calculated_result: string;
  date: string;
  status: string;
  order: {
    user: {
      id: string;
      fullname: string;
      email: string;
    };
  };
}

// ... Suas outras interfaces (UpdateUserData, etc.) podem vir aqui ...


// --- ENGINE DE EXECUÇÃO ---
const API_URL = 'https://orthomovi-hasura.t2wird.easypanel.host/v1/graphql';

const executeGraphQL = async (query: string, token: string, variables?: any) => {
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

    const result = await response.json();
    if (result.errors) {
      console.error('Erros da API do Hasura:', result.errors);
      throw new Error(result.errors[0].message);
    }
    return result.data;
  } catch (error) {
    console.error('Erro na execução da requisição GraphQL:', error);
    throw error;
  }
};

// --- QUERIES E MUTATIONS ---
const QUERIES_AND_MUTATIONS = {
  // Query para buscar todos os resultados, ordenada por data mais recente
  GET_ALL_RESULTS: `
    query GetAllResults {
      results(order_by: {date: desc}) {
        id
        calculated_result
        date
        status
        order {
          user {
            id
            fullname
            email
          }
        }
      }
    }
  `,
  // ... Suas outras queries e mutações ...
  GET_ALL_USERS: `
    query GetAllUsers {
      users(order_by: {fullname: asc}) { id, fullname, email, phone, role }
    }
  `,
};

// --- SERVIÇO EXPORTADO ---
export const graphqlService = {
  /**
   * (Admin) Busca todos os resultados/pedidos. Requer um token de admin.
   */
  async getAllResults(token: string): Promise<Result[]> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_ALL_RESULTS, token);
    return data?.results || [];
  },

  /**
   * (Admin) Busca todos os usuários. Requer um token de admin.
   */
  async getAllUsers(token: string): Promise<User[]> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_ALL_USERS, token);
    return data?.users || [];
  },

  // ... Suas outras funções de serviço (update, get config, etc.)
};
