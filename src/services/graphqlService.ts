
// --- INTERFACES DE DADOS (ÚNICA FONTE DA VERDADE) ---
export interface User {
  id: string;
  fullname: string;
  email: string;
  phone?: string;
  role?: 'app_admin' | 'user'; // interpretado na UI
}

export interface Result {
  id: string;
  calculated_result: string;
  date: string;
  status: string;
  order: {
    id: string;
    user: {
      id: string;
      fullname: string;
      email?: string;
    };
  };
}

export interface Image {
  id: string;
  orderID: string;
  url: string;
  created_at?: string;
}

export interface UpdateUserData {
  fullname?: string;
  email?: string;
  phone?: string;
}

export interface CompanyConfig {
  company_name: string;
  cnpj: string;
}

export interface AdminContact {
  email: string;
  phone: string;
  fullname: string;
}

export interface UpdateCompanyConfigData {
  company_name?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
}

// --- ENGINE DE EXECUÇÃO ---
const API_URL = 'https://orthomovi-hasura.t2wird.easypanel.host/v1/graphql';

const executeGraphQL = async (
    token: string,
    query: string,
    variables?: Record<string, any>,
    role: 'user' | 'app_admin' = 'user'
): Promise<any> => {
  if (!token) throw new Error('Token de autenticação não fornecido.');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Hasura-Role': role,
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
      console.error('Erro GraphQL:', result.errors);
      throw new Error(result.errors[0].message);
    }

    return result.data;
  } catch (error) {
    console.error('Erro na requisição GraphQL:', error);
    throw error;
  }
};

// --- QUERIES E MUTATIONS ---
const QUERIES = {
  GET_ALL_USERS: `
    query {
      users(order_by: {fullname: asc}) {
        id
        fullname
        email
        phone
      }
    }
  `,
  UPDATE_USER_BY_ID: `
    mutation ($id: String!, $data: users_set_input!) {
      update_users_by_pk(pk_columns: {id: $id}, _set: $data) {
        id
        fullname
        email
        phone
      }
    }
  `,
  GET_ALL_RESULTS: `
    query {
      results(order_by: {date: desc}) {
        id
        calculated_result
        date
        status
        order {
          id
          user {
            id
            fullname
            email
          }
          images {
            id
            url
          }
        }
      }
    }
  `,
  GET_ADMIN_DATA: `
    query ($adminId: String!) {
      company_config(limit: 1) {
        company_name
        cnpj
      }
      users(where: {id: {_eq: $adminId}}) {
        email
        phone
        fullname
      }
    }
  `,
  UPDATE_COMPANY_CONFIG: `
    mutation ($companyData: company_config_set_input!, $contactData: users_set_input!, $adminId: String!) {
      update_company_config(where: {}, _set: $companyData) {
        affected_rows
      }
      update_users(where: {id: {_eq: $adminId}}, _set: $contactData) {
        affected_rows
      }
    }
  `,
  UPDATE_RESULT_STATUS: `
    mutation ($id: uuid!, $status: String!) {
      update_results_by_pk(pk_columns: {id: $id}, _set: {status: $status}) {
        id
        status
      }
    }
  `,
  INSERT_IMAGE: `
    mutation ($orderID: uuid!, $url: String!) {
      insert_images_one(object: {orderID: $orderID, url: $url}) {
        id
        orderID
        url
        created_at
      }
    }
  `,
  GET_IMAGES_BY_ORDER: `
    query ($orderID: uuid!) {
      images(where: {orderID: {_eq: $orderID}}, order_by: {created_at: asc}) {
        id
        url
        created_at
      }
    }
  `,
};

// --- SERVIÇO EXPORTADO ---
export const graphqlService = {
  async getAllUsers(token: string): Promise<User[]> {
    const data = await executeGraphQL(token, QUERIES.GET_ALL_USERS, {}, 'app_admin');
    return data?.users ?? [];
  },

  async updateUser(token: string, userId: string, userData: UpdateUserData): Promise<User | null> {
    const data = await executeGraphQL(token, QUERIES.UPDATE_USER_BY_ID, {
      id: userId,
      data: userData,
    }, 'app_admin');
    return data?.update_users_by_pk ?? null;
  },

  async getAllResults(token: string): Promise<Result[]> {
    const data = await executeGraphQL(token, QUERIES.GET_ALL_RESULTS, {}, 'app_admin');
    return data?.results ?? [];
  },

  async getAdminData(token: string, adminId: string): Promise<{ config: CompanyConfig; admin: AdminContact }> {
    const data = await executeGraphQL(token, QUERIES.GET_ADMIN_DATA, { adminId }, 'app_admin');
    return {
      config: data?.company_config?.[0],
      admin: data?.users?.[0],
    };
  },

  async updateCompanyConfig(
      token: string,
      adminId: string,
      companyData: UpdateCompanyConfigData
  ): Promise<boolean> {
    const { company_name, cnpj, email, phone } = companyData;

    const payload = {
      companyData: { company_name, cnpj },
      contactData: { email, phone },
      adminId,
    };

    const data = await executeGraphQL(token, QUERIES.UPDATE_COMPANY_CONFIG, payload, 'app_admin');
    return data?.update_company_config?.affected_rows > 0;
  },

  async updateResultStatus(token: string, resultId: string, status: string): Promise<{ id: string; status: string }> {
    const data = await executeGraphQL(token, QUERIES.UPDATE_RESULT_STATUS, { id: resultId, status }, 'app_admin');
    return data?.update_results_by_pk;
  },

  async insertImage(token: string, orderID: string, url: string): Promise<Image | null> {
    const data = await executeGraphQL(token, QUERIES.INSERT_IMAGE, { orderID, url }, 'user');
    return data?.insert_images_one ?? null;
  },

  async getImagesByOrder(token: string, orderID: string): Promise<Image[]> {
    const data = await executeGraphQL(token, QUERIES.GET_IMAGES_BY_ORDER, { orderID }, 'user');
    return data?.images ?? [];
  },

  getAdminConfig: async (token: string, id: string) => {
    const response = await fetch("/api/admin-config", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar configurações do admin");
    }

    const result = await response.json();
    return result;
  },
};
