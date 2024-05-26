export interface LoginCredentials {
  email: string;
  senha: string;
}

export interface LoginResponse {
  status: number;
  data: {
    message: string;
    user: {
      id: number;
      nome: string;
      email: string;
      dfatores?: boolean;
      isadmin: string;
    };
  };
  error?: string;
}
