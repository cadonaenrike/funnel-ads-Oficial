// services/PastaService.tsx

import { Pasta } from "@/types/PasteTypes";
import api from "./Api";

export const addPasta = async (
  pasta: Omit<Pasta, "campanhas">
): Promise<Pasta> => {
  try {
    const response = await api.post<Pasta>("/api/pastas", pasta); // Ajuste o endpoint conforme necessário
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};

export const getAllPastas = async (): Promise<Pasta[]> => {
  try {
    const response = await api.get<Pasta[]>("/pastas"); // Ajuste o endpoint conforme necessário
    return response.data;
  } catch (error) {
    console.error("Erro ao obter pastas:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};
export const getPastaById = async (id: string): Promise<Pasta> => {
  try {
    const response = await api.get<Pasta>(`/getPastas/${id}`);
    return response.data; // Assumindo que response.data é uma única Pasta
  } catch (error) {
    console.error("Erro ao obter pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};
export const getPastaByIdUser = async (idUser: string): Promise<Pasta> => {
  try {
    const response = await api.get<Pasta>(`/getIdUserPasta/${idUser}`);
    console.log(response);
    return response.data; // Assumindo que response.data é uma única Pasta
  } catch (error) {
    console.error("Erro ao obter pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};

export const updatePasta = async (
  id: string,
  pasta: Omit<Pasta, "campanhas">
): Promise<Pasta> => {
  try {
    const response = await api.put<Pasta>(`/pastas/${id}`, pasta); // Ajuste o endpoint conforme necessário
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};

export const deletePasta = async (id: string): Promise<void> => {
  try {
    await api.delete(`/deletePasta/${id}`); // Ajuste o endpoint conforme necessário
  } catch (error) {
    console.error("Erro ao deletar pasta:", error);
    throw error; // Ou retorne um valor de erro adequado
  }
};
