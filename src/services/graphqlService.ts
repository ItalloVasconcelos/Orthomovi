
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
  status: string;
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
      }
    }
  `,

  GET_COMPANY_CONFIG: `
    query GetCompanyConfig {
      company_config(limit: 1) {
        company_name
        cnpj
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
    console.log('Executando query:', query);
    console.log('Com variáveis:', variables);
    
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
    console.log('Resultado da query:', result);

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
    try {
      const data = await executeQuery(QUERIES.GET_ALL_RESULTS);
      const results = data?.results || [];
      console.log('Resultados encontrados:', results);
      
      // Garantir que o status seja sempre uma string
      return results.map((result: any) => ({
        ...result,
        status: Array.isArray(result.status) ? (result.status[0] || 'Análise') : (result.status || 'Análise')
      }));
    } catch (error) {
      console.error('Erro ao buscar resultados:', error);
      // Retornar dados mock para demonstração caso a API falhe
      return [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          calculated_result: '25.4',
          date: '2024-01-15T10:30:00Z',
          status: 'Análise',
          measurements: {
            medida_a: 12.5,
            medida_h: 8.3,
            medida_d: 15.2
          },
          order: {
            user: {
              id: 'user1',
              fullname: 'Maria Silva',
              email: 'maria@email.com'
            }
          }
        },
        {
          id: '456e7890-e89b-12d3-a456-426614174001',
          calculated_result: '28.7',
          date: '2024-01-14T14:20:00Z',
          status: 'Aprovado',
          measurements: {
            medida_a: 13.1,
            medida_h: 9.2,
            medida_d: 16.8
          },
          order: {
            user: {
              id: 'user2',
              fullname: 'João Santos',
              email: 'joao@email.com'
            }
          }
        }
      ];
    }
  },

  async getAdminContact(): Promise<AdminContact | null> {
    console.log('Buscando dados de contato do admin...');
    try {
      const data = await executeQuery(QUERIES.GET_ADMIN_CONTACT);
      const users = data?.users;
      if (users && users.length > 0) {
        return {
          email: users[0].email,
          phone: users[0].phone,
          user: {
            fullname: users[0].fullname,
            email: users[0].email
          }
        };
      }
    } catch (error) {
      console.error('Erro ao buscar contato do admin:', error);
    }
    
    // Retornar dados padrão se não conseguir buscar
    return {
      email: 'contato@orthomovi.com.br',
      phone: '(88) 99999-9999',
      user: {
        fullname: 'Admin OrthoMovi',
        email: 'admin@orthomovi.com.br'
      }
    };
  },

  async getCompanyConfig(): Promise<CompanyConfig | null> {
    console.log('Buscando configurações da empresa...');
    try {
      const data = await executeQuery(QUERIES.GET_COMPANY_CONFIG);
      const config = data?.company_config;
      if (config && config.length > 0) {
        return config[0];
      }
    } catch (error) {
      console.error('Erro ao buscar configurações da empresa:', error);
    }
    
    // Retornar valores padrão se a tabela não existir ou houver erro
    return {
      company_name: "OrthoMovi Órteses Pediátricas",
      cnpj: "12.345.678/0001-90"
    };
  },
};
