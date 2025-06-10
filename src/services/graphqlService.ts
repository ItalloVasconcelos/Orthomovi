
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

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  phone?: string;
}

export interface CompanyConfig {
  id: string;
  company_name: string;
  cnpj: string;
}

export interface ContactConfig {
  id: string;
  email: string;
  phone: string;
}

export interface UpdateCompanyConfigData {
  company_name: string;
  email: string;
  phone: string;
  cnpj: string;
}

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
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

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

  // Query para buscar todos os usuários
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

  // Mutation para atualizar usuário
  UPDATE_USER: `
    mutation UpdateUser($id: uuid!, $data: users_set_input!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: $data) {
        id
        fullname
        email
        phone
        role
      }
    }
  `,

  // Query para buscar configurações da empresa
  GET_COMPANY_CONFIG: `
    query GetCompanyConfig {
      company_config(limit: 1) {
        id
        company_name
        cnpj
      }
      contact_config(limit: 1) {
        id
        email
        phone
      }
    }
  `,

  // Mutation para atualizar configurações da empresa
  UPDATE_COMPANY_CONFIG: `
    mutation UpdateCompanyConfig($companyData: company_config_set_input!, $contactData: contact_config_set_input!) {
      update_company_config(where: {}, _set: $companyData) {
        affected_rows
      }
      update_contact_config(where: {}, _set: $contactData) {
        affected_rows
      }
    }
  `,

  // Mutation para atualizar status do resultado
  UPDATE_RESULT_STATUS: `
    mutation UpdateResultStatus($id: uuid!, $status: String!) {
      update_results_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
        id
        status
      }
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

  /**
   * (Admin) Atualiza dados de um usuário específico
   */
  async updateUser(userId: string, userData: UpdateUserData, token: string): Promise<User> {
    const data = await executeGraphQL(
      QUERIES_AND_MUTATIONS.UPDATE_USER, 
      token, 
      { id: userId, data: userData }
    );
    return data?.update_users_by_pk;
  },

  /**
   * (Admin) Busca configurações da empresa e contato
   */
  async getAdminConfig(token: string): Promise<{ company: CompanyConfig | null; contact: ContactConfig | null }> {
    const data = await executeGraphQL(QUERIES_AND_MUTATIONS.GET_COMPANY_CONFIG, token);
    return {
      company: data?.company_config?.[0] || null,
      contact: data?.contact_config?.[0] || null,
    };
  },

  /**
   * (Admin) Atualiza configurações da empresa
   */
  async updateCompanyConfig(token: string, configData: UpdateCompanyConfigData): Promise<void> {
    const companyData = {
      company_name: configData.company_name,
      cnpj: configData.cnpj,
    };
    
    const contactData = {
      email: configData.email,
      phone: configData.phone,
    };

    await executeGraphQL(
      QUERIES_AND_MUTATIONS.UPDATE_COMPANY_CONFIG, 
      token, 
      { companyData, contactData }
    );
  },

  /**
   * (Admin) Atualiza status de um resultado
   */
  async updateResultStatus(resultId: string, newStatus: string, token: string): Promise<void> {
    await executeGraphQL(
      QUERIES_AND_MUTATIONS.UPDATE_RESULT_STATUS, 
      token, 
      { id: resultId, status: newStatus }
    );
  },
};
