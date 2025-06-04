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
}

// Query para buscar usuário no login
const GET_USER_QUERY = `
  query GetUser($email: String!, $password: String!) {
    users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
      id
      fullname
      email
      phone
    }
  }
`;

// Query para buscar todos os usuários
const GET_ALL_USERS_QUERY = `
  query GetAllUsers {
    users {
      id
      fullname
      email
      phone
    }
  }
`;

// Mutation para criar novo usuário
const CREATE_USER_MUTATION = `
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
`;

// Query para buscar configurações da empresa
const GET_COMPANY_CONFIG_QUERY = `
  query GetCompanyConfig {
    config {
      company_name
      cnpj
    }
  }
`;

// Query para buscar dados de contato do admin
const GET_ADMIN_CONTACT_QUERY = `
  query GetAdminContact {
    users(limit: 1) {
      email
      phone
    }
  }
`;

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

export const graphqlService = {
  // Função para fazer login (GET user)
  async loginUser(credentials: LoginCredentials): Promise<User | null> {
    try {
      console.log('Tentando fazer login com:', credentials);
      
      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: GET_USER_QUERY,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        }),
      }, 15000); // 15 segundos de timeout

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Resposta da API:', result);
      
      if (result.errors) {
        console.error('Erros da API:', result.errors);
        throw new Error(result.errors[0].message);
      }

      const users = result.data?.users;
      console.log('Usuários encontrados:', users);
      return users && users.length > 0 ? users[0] : null;
    } catch (error) {
      console.error('Erro no login:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }
      throw error;
    }
  },

  // Função para registrar usuário (POST user)
  async registerUser(userData: RegisterData): Promise<User> {
    try {
      console.log('Tentando registrar usuário:', userData);
      
      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: CREATE_USER_MUTATION,
          variables: {
            fullname: userData.fullname,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
          },
        }),
      }, 15000); // 15 segundos de timeout

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Resposta do registro:', result);
      
      if (result.errors) {
        console.error('Erros no registro:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data?.insert_users_one;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }
      throw error;
    }
  },

  // Função para buscar todos os usuários
  async getAllUsers(): Promise<User[]> {
    try {
      console.log('Buscando todos os usuários...');
      
      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: GET_ALL_USERS_QUERY,
        }),
      }, 15000);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Usuários encontrados:', result);
      
      if (result.errors) {
        console.error('Erros na busca de usuários:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data?.users || [];
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }
      throw error;
    }
  },

  // Função para buscar configurações da empresa
  async getCompanyConfig(): Promise<CompanyConfig | null> {
    try {
      console.log('Buscando configurações da empresa...');
      
      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: GET_COMPANY_CONFIG_QUERY,
        }),
      }, 15000);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Configurações da empresa:', result);
      
      if (result.errors) {
        console.error('Erros na busca de configurações:', result.errors);
        throw new Error(result.errors[0].message);
      }

      const config = result.data?.config;
      return config && config.length > 0 ? config[0] : null;
    } catch (error) {
      console.error('Erro ao buscar configurações da empresa:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }
      throw error;
    }
  },

  // Função para buscar dados de contato do admin
  async getAdminContact(): Promise<AdminContact | null> {
    try {
      console.log('Buscando dados de contato do admin...');
      
      const response = await fetchWithTimeout(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: GET_ADMIN_CONTACT_QUERY,
        }),
      }, 15000);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Dados de contato do admin:', result);
      
      if (result.errors) {
        console.error('Erros na busca de contato do admin:', result.errors);
        throw new Error(result.errors[0].message);
      }

      const users = result.data?.users;
      return users && users.length > 0 ? { email: users[0].email, phone: users[0].phone } : null;
    } catch (error) {
      console.error('Erro ao buscar dados de contato do admin:', error);
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Erro de conexão: Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
      }
      throw error;
    }
  },
};
