// services/subUserService.ts

import { SubUser } from "@/types/SubUsersTypes";
import api from "./Api";

export const createSubUser = async (subUser: SubUser): Promise<boolean> => {
  const userId = sessionStorage.getItem("idUser") ?? ""; // Definindo uma string vazia como valor padrão se userId for null
  try {
    const formData = new FormData();
    formData.append("idAdmin", userId);
    formData.append("id", subUser.id);
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
    const response = await api.post(`/postSubUser`, formData, {});

    return response.status === 200;
  } catch (error) {
    console.error("Erro ao criar subUser", error);
    return false;
  }
};

// Obter todos os subUsers de um usuário
export const getSubUsers = async (): Promise<SubUser[] | null> => {
  const userAdminLogado = sessionStorage.getItem("idUser");
  try {
    const response = await api.get(
      `/getSubUsersAll/${userAdminLogado}/subUsers`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter subUsers", error);
    return null;
  }
};

// Obter um subUser por ID
export const getSubUserById = async (
  subUserId: string
): Promise<any | null> => {
  const userId = sessionStorage.getItem("idUser");
  try {
    const response = await api.get(`/getSubUser/${userId}/${subUserId}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter subUser por ID", error);
    return null;
  }
};

// Obter os últimos 3 subUsers
export const getLastThreeClients = async (): Promise<SubUser[]> => {
  const userAdminLogado = sessionStorage.getItem("idUser");
  try {
    const response = await api.get(
      `/getSubUsersAll/${userAdminLogado}/subUsers`
    );
    if (response.status === 200) {
      const subUsers: SubUser[] = response.data;
      // Ordenar os subUsers pelo ID de forma decrescente
      const sortedSubUsers = subUsers.sort((a, b) => {
        return parseInt(b.id, 10) - parseInt(a.id, 10);
      });
      // Pegar os primeiros 3 subUsers
      return sortedSubUsers.slice(0, 3);
    }
    return [];
  } catch (error) {
    console.error("Erro ao obter os últimos clientes:", error);
    return [];
  }
};

// Atualizar um subUser
export const updateSubUser = async (
  subUserId: string,
  subUser: SubUser
): Promise<boolean> => {
  try {
    const response = await api.put(`/putSubUser/${subUserId}`, subUser);
    return response.status === 200; // Ou outro código de sucesso esperado
  } catch (error) {
    console.error("Erro ao atualizar subUser", error);
    return false;
  }
};

// Deletar um subUser
export const deleteSubUser = async (subUserId: string): Promise<boolean> => {
  try {
    const response = await api.delete(`/deleteSubUser/${subUserId}`);
    return response.status === 204; // Ou outro código de sucesso esperado
  } catch (error) {
    console.error("Erro ao deletar subUser", error);
    return false;
  }
};
