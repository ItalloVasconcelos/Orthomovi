const API_URL = 'https://201.46.120.216:8080/v1/graphql';

const headers = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': 'mysecretkey',
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Query para buscar usuário no login
const GET_USER_QUERY = `
  query GetUser($email: String!, $password: String!) {
    users(where: {email: {_eq: $email}, password: {_eq: $password}}) {
      id
      name
      email
      phone
    }
  }
`;

// Mutation para criar novo usuário
const CREATE_USER_MUTATION = `
  mutation CreateUser($name: String!, $email: String!, $phone: String!, $password: String!) {
    insert_users_one(object: {
      name: $name,
      email: $email,
      phone: $phone,
      password: $password
    }) {
      id
      name
      email
      phone
    }
  }
`;

export const graphqlService = {
  // Função para fazer login (GET user)
  async loginUser(credentials: LoginCredentials): Promise<User | null> {
    try {
      console.log('Tentando fazer login com:', credentials);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: GET_USER_QUERY,
          variables: {
            email: credentials.email,
            password: credentials.password,
          },
        }),
      });

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
      throw error;
    }
  },

  // Função para registrar usuário (POST user)
  async registerUser(userData: RegisterData): Promise<User> {
    try {
      console.log('Tentando registrar usuário:', userData);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: CREATE_USER_MUTATION,
          variables: {
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            password: userData.password,
          },
        }),
      });

      const result = await response.json();
      console.log('Resposta do registro:', result);
      
      if (result.errors) {
        console.error('Erros no registro:', result.errors);
        throw new Error(result.errors[0].message);
      }

      return result.data?.insert_users_one;
    } catch (error) {
      console.error('Erro no cadastro:', error);
      throw error;
    }
  },
};
