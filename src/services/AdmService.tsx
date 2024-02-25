import api from "./Api";
import { LoginCredentials, LoginResponse } from "@/types/LoginTypes";

export const LoginService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse | null> {
    try {
      const response = await api.post("/login", credentials, {});
      return response;
    } catch (error) {
      console.error("Erro ao tentar logar", error);
      return null;
    }
  },
};
