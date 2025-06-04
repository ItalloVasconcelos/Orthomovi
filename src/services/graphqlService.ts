
const API_URL = 'https://orthomovi-hasura.4bcy4g.easypanel.host/v1/graphql';

const headers = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': 'mysecretkey',
};

export interface User {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

export interface CompanyConfig {
  company_name: string;
  cnpj: string;
}

export interface AdminContact {
  email: string;
  phone: string;
  user: {
    fullname: string;
    email: string;
  }
}

export interface Result {
  id: string;
  calculated_result: string;
  date: string;
  status: string | string[];
  measurements?: {
    medida_a?: number;
    medida_h?: number;
    medida_d?: number;
  };
  order: {
    user: {
      id: string;
      fullname: string;
      email: string;
    };
  };
}

// Consolidated queries
const QUERIES = {
  GET_USER: `
    query GetUser($email: String!, $password: String!) {
      users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
        id
        fullname
        email
        phone
      }
    }
  `,
  
  GET_ALL_USERS: `
    query GetAllUsers {
      users {
        id
        fullname
        email
        phone
      }
    }
  `,
  
  CREATE_USER: `
    mutation CreateUser($fullname: String!, $email: String!, $phone: String!, $password: String!) {
      insert_users_one(object: {
        fullname: $fullname,
        email: $email,
        phone: $phone,
        password: $password
      }) {
        id
        fullname
        email
        phone
      }
    }
  `,
  
  GET_ALL_RESULTS: `
    query GetAllResults {
      results {
        id
        calculated_result
        date
        status
        measurements {
          medida_a
          medida_h
          medida_d
        }
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
  
  GET_ADMIN_CONTACT: `
    query GetAdminContact {
      users(limit: 1) {
        email
        phone
        fullname
        email
      }
    }
  `
};

const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Timeout: O servidor não respondeu dentro do tempo esperado. Verifique sua conexão ou tente novamente.');
    }
    throw error;
  }
};

const executeQuery = async (query: string, variables?: any) => {
  try {
    const response = await fetchWithTimeout(API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    }, 15000);

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      console.error('Erros da API:', result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
    }
    throw error;
  }
};

export const graphqlService = {
  async loginUser(credentials: LoginCredentials): Promise<User | null> {
    console.log('Tentando fazer login com:', credentials);
    const data = await executeQuery(QUERIES.GET_USER, credentials);
    const users = data?.users;
    console.log('Usuários encontrados:', users);
    return users && users.length > 0 ? users[0] : null;
  },

  async registerUser(userData: RegisterData): Promise<User> {
    console.log('Tentando registrar usuário:', userData);
    const data = await executeQuery(QUERIES.CREATE_USER, userData);
    return data?.insert_users_one;
  },

  async getAllUsers(): Promise<User[]> {
    console.log('Buscando todos os usuários...');
    const data = await executeQuery(QUERIES.GET_ALL_USERS);
    return data?.users || [];
  },

  async getAllResults(): Promise<Result[]> {
    console.log('Buscando todos os resultados...');
    const data = await executeQuery(QUERIES.GET_ALL_RESULTS);
    return data?.results || [];
  },

  async getAdminContact(): Promise<AdminContact | null> {
    console.log('Buscando dados de contato do admin...');
    const data = await executeQuery(QUERIES.GET_ADMIN_CONTACT);
    const users = data?.users;
    return users && users.length > 0 ? {
      email: users[0].email,
      phone: users[0].phone,
      user: {
        fullname: users[0].fullname,
        email: users[0].email
      }
    } : null;
  },

  // Removed getCompanyConfig as it was causing errors in the network requests
};
