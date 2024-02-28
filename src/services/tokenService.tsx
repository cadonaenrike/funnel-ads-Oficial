import { TokenData, TokenUpdateData } from "@/types/tokenTypes";
import api from "./Api";

class TokenService {
  // Postar um novo token
  static async postToken(data: TokenData): Promise<void> {
    try {
      const response = await api.post("/postToken", data);
      console.log("Token criado com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao criar token", error);
    }
  }

  // Obter tokens do usuário logado
  static async getTokens(): Promise<void> {
    try {
      const userId = sessionStorage.getItem("userId");
      if (!userId) {
        console.error("ID do usuário não encontrado");
        return;
      }
      const response = await api.get(`/getToken/${userId}`);
      console.log("Tokens recuperados com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao recuperar tokens", error);
    }
  }

  // Atualizar um token existente
  static async updateToken(id: string, data: TokenUpdateData): Promise<void> {
    try {
      const response = await api.put(`/putToken/${id}`, data);
      console.log("Token atualizado com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao atualizar token", error);
    }
  }

  // Deletar um token
  static async deleteToken(id: string): Promise<void> {
    try {
      const response = await api.delete(`/deleteToken/${id}`);
      console.log("Token deletado com sucesso", response.data);
    } catch (error) {
      console.error("Erro ao deletar token", error);
    }
  }
}

export default TokenService;
