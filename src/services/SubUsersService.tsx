// services/subUserService.ts

import { SubUser } from "@/types/SubUsersTypes";
import api from "./Api";

// Criar um novo SubUser
export const createSubUser = async (subUser: SubUser): Promise<boolean> => {
  const userId = sessionStorage.getItem("userId");
  try {
    const formData = new FormData();
    formData.append("nome", subUser.nome);
    formData.append("sobrenome", subUser.sobrenome);
    formData.append("cpf", subUser.cpf);
    formData.append("celular", subUser.celular);
    formData.append("cargo", subUser.cargo);
    formData.append("nivelAcesso", subUser.nivelAcesso);
    formData.append("email", subUser.email);
    if (subUser.foto) {
      formData.append("foto", subUser.foto);
    }

    // Substitua '/subUsers' pelo seu endpoint correto
    const response = await api.post(
      `/usuarios/${userId}/subUsers`,
      formData,
      {}
    );

    return response.status === 200;
  } catch (error) {
    console.error("Erro ao criar subUser", error);
    return false;
  }
};

// As demais funções permanecem inalteradas...

// Obter todos os subUsers de um usuário
export const getSubUsers = async (): Promise<SubUser[] | null> => {
  const userId = sessionStorage.getItem("userId");
  try {
    const response = await api.get(`/usuarios/${userId}/subUsers`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter subUsers", error);
    return null;
  }
};

// Atualizar um subUser
export const updateSubUser = async (
  subUserId: number,
  subUser: SubUser
): Promise<boolean> => {
  const userId = sessionStorage.getItem("userId");
  try {
    const response = await api.put(
      `/usuarios/${userId}/subUsers/${subUserId}`,
      subUser
    );
    return response.status === 200; // Ou outro código de sucesso esperado
  } catch (error) {
    console.error("Erro ao atualizar subUser", error);
    return false;
  }
};

// Deletar um subUser
export const deleteSubUser = async (subUserId: number): Promise<boolean> => {
  const userId = sessionStorage.getItem("userId");
  try {
    const response = await api.delete(
      `/usuarios/${userId}/subUsers/${subUserId}`
    );
    return response.status === 200; // Ou outro código de sucesso esperado
  } catch (error) {
    console.error("Erro ao deletar subUser", error);
    return false;
  }
};
