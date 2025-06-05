
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
  role?: 'admin' | 'user';
}

export interface LoginCredentials {
  emailOrPhone: string;
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
  order: {
    user: {
      id: string;
      fullname: string;
      email: string;
    };
  };
}

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  phone?: string;
}

export interface UpdateCompanyConfigData {
  company_name?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
}

// Consolidated queries and mutations
const QUERIES = {
  GET_USER_BY_EMAIL_OR_PHONE: `
    query GetUserByEmailOrPhone($emailOrPhone: String!, $password: String!) {
      users(where: {
        _or: [
          {email: {_eq: $emailOrPhone}},
          {phone: {_eq: $emailOrPhone}}
        ],
        password: {_eq: $password}
      }) {
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
  
  UPDATE_USER: `
    mutation UpdateUser($id: String!, $fullname: String, $email: String, $phone: String) {
      update_users_by_pk(pk_columns: {id: $id}, _set: {
        fullname: $fullname,
        email: $email,
        phone: $phone
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
  
  GET_ADMIN_DATA: `
    query GetAdminData {
      admin(limit: 1) {
        company_name
        cnpj
      }
      users(where: {id: {_eq: "3535796c-6e5b-4764-a91a-8d8655efa381"}}) {
        email
        phone
        fullname
      }
    }
  `,

  UPDATE_COMPANY_CONFIG: `
    mutation UpdateCompanyConfig(
      $company_name: String,
      $cnpj: String,
      $email: String,
      $phone: String
    ) {
      update_admin(_set: {
        company_name: $company_name,
        cnpj: $cnpj
      }) {
        affected_rows
      }
      update_users(
        where: {id: {_eq: "3535796c-6e5b-4764-a91a-8d8655efa381"}},
        _set: {
          email: $email,
          phone: $phone
        }
      ) {
        affected_rows
      }
    }
  `,

  UPDATE_RESULT_STATUS: `
    mutation UpdateResultStatus($id: String!, $status: String!) {
      update_results_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
        id
        status
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
    const data = await executeQuery(QUERIES.GET_USER_BY_EMAIL_OR_PHONE, {
      emailOrPhone: credentials.emailOrPhone,
      password: credentials.password
    });
    const users = data?.users;
    console.log('Usuários encontrados:', users);
    
    if (users && users.length > 0) {
      const user = users[0];
      // Determinar o role baseado no ID
      const role = user.id === '3535796c-6e5b-4764-a91a-8d8655efa381' ? 'admin' : 'user';
      return { ...user, role };
    }
    return null;
  },

  async registerUser(userData: RegisterData): Promise<User> {
    console.log('Tentando registrar usuário:', userData);
    const data = await executeQuery(QUERIES.CREATE_USER, userData);
    const user = data?.insert_users_one;
    return { ...user, role: 'user' };
  },

  async getAllUsers(): Promise<User[]> {
    console.log('Buscando todos os usuários...');
    const data = await executeQuery(QUERIES.GET_ALL_USERS);
    const users = data?.users || [];
    return users.map((user: any) => ({
      ...user,
      role: user.id === '3535796c-6e5b-4764-a91a-8d8655efa381' ? 'admin' : 'user'
    }));
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User | null> {
    console.log('Atualizando usuário:', id, userData);
    const data = await executeQuery(QUERIES.UPDATE_USER, { id, ...userData });
    const user = data?.update_users_by_pk;
    if (user) {
      return {
        ...user,
        role: user.id === '3535796c-6e5b-4764-a91a-8d8655efa381' ? 'admin' : 'user'
      };
    }
    return null;
  },

  async getAllResults(): Promise<Result[]> {
    console.log('Buscando todos os resultados...');
    try {
      const data = await executeQuery(QUERIES.GET_ALL_RESULTS);
      const results = data?.results || [];
      console.log('Resultados encontrados:', results);
      
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

  async updateResultStatus(id: string, status: string): Promise<boolean> {
    console.log('Atualizando status do resultado:', id, status);
    try {
      await executeQuery(QUERIES.UPDATE_RESULT_STATUS, { id, status });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return false;
    }
  },

  async getAdminConfig(): Promise<{company: CompanyConfig | null, contact: AdminContact | null}> {
    console.log('Buscando configurações do admin...');
    try {
      const data = await executeQuery(QUERIES.GET_ADMIN_DATA);
      const adminData = data?.admin?.[0];
      const userData = data?.users?.[0];
      
      return {
        company: adminData ? {
          company_name: adminData.company_name,
          cnpj: adminData.cnpj
        } : {
          company_name: "OrthoMovi Órteses Pediátricas",
          cnpj: "12.345.678/0001-90"
        },
        contact: userData ? {
          email: userData.email,
          phone: userData.phone,
          user: {
            fullname: userData.fullname,
            email: userData.email
          }
        } : {
          email: 'admin@orthomovi.com.br',
          phone: '(88) 99999-9999',
          user: {
            fullname: 'Admin OrthoMovi',
            email: 'admin@orthomovi.com.br'
          }
        }
      };
    } catch (error) {
      console.error('Erro ao buscar configurações do admin:', error);
      return {
        company: {
          company_name: "OrthoMovi Órteses Pediátricas",
          cnpj: "12.345.678/0001-90"
        },
        contact: {
          email: 'admin@orthomovi.com.br',
          phone: '(88) 99999-9999',
          user: {
            fullname: 'Admin OrthoMovi',
            email: 'admin@orthomovi.com.br'
          }
        }
      };
    }
  },

  async updateCompanyConfig(configData: UpdateCompanyConfigData): Promise<boolean> {
    console.log('Atualizando configurações da empresa:', configData);
    try {
      await executeQuery(QUERIES.UPDATE_COMPANY_CONFIG, configData);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      return false;
    }
  },
};
