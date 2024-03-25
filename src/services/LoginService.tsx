import api from "./Api";
import { LoginCredentials, LoginResponse } from "@/types/LoginTypes";
import { CriaLoginType, CriaLoginRespostaType } from "@/types/CriaLoginTypes";

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

export const CriaLoginService = {
  async createAccount(
    accountData: CriaLoginType
  ): Promise<CriaLoginRespostaType | null> {
    try {
      const response = await api.post("/criar-conta", accountData);

      if (response.status === 200) {
        console.log("Conta criada com sucesso");
        return response.data;
      } else {
        console.error("Erro ao criar conta:", response.statusText);
        return null;
      }
    } catch (error: any) {
      console.error("Erro ao criar conta:", error.message);
      return null;
    }
  },
};
