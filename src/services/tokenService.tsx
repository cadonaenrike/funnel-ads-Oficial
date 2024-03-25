import { TokenData, TokenUpdateData } from "@/types/tokenTypes";
import api from "./Api";

export async function postToken(data: Partial<TokenData>): Promise<boolean> {
  try {
    const response = await api.post("/postToken", {
      ...data,
      iduser: sessionStorage.getItem("idUser"),
    });
    console.log("Token criado com sucesso", response.data);
    return true;
  } catch (error) {
    console.error("Erro ao criar token", error);
    return false;
  }
}

// Obter tokens do usuário logado
export async function getTokens(): Promise<TokenData[]> {
  try {
    const userId = sessionStorage.getItem("idUser");

    if (!userId) {
      console.error("ID do usuário não encontrado");
      return [];
    }
    const response = await api.get(`/getToken/${userId}`);
    console.log(response);

    return response.data || [];
  } catch (error) {
    console.error("Erro ao recuperar tokens", error);
    return [];
  }
}

// Atualizar um token existente
export async function updateToken(
  id: string,
  data: TokenUpdateData
): Promise<boolean> {
  try {
    const response = await api.put(`/putToken/${id}`, {
      ...data,
      iduser: sessionStorage.getItem("idUser"),
    });
    console.log("Token atualizado com sucesso", response.data);
    return true;
  } catch (error) {
    console.error("Erro ao atualizar token", error);
    return false;
  }
}

// Deletar um token
export async function deleteToken(id: string): Promise<void> {
  try {
    const response = await api.delete(`/deleteToken/${id}`);
    console.log("Token deletado com sucesso", response.data);
  } catch (error) {
    console.error("Erro ao deletar token", error);
  }
}
