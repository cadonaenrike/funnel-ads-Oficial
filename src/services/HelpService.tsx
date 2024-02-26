import api from "./Api";
import { HelpType } from "@/types/HelpType";

export const addHelp = async (data: HelpType): Promise<HelpType> => {
  try {
    const response = await api.post<HelpType>("/postHelp", data);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar help:", error);
    throw error;
  }
};

export const updateHelp = async (
  id: string,
  categorias?: string[],
  topico?: string,
  descrição?: string
): Promise<HelpType> => {
  try {
    const response = await api.put<HelpType>(`/putHelp/${id}`, {
      id,
      categorias,
      topico,
      descrição,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar help:", error);
    throw error;
  }
};

export const getAllHelps = async (): Promise<HelpType[]> => {
  try {
    const response = await api.get<HelpType[]>("/getHelp");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter helps:", error);
    throw error;
  }
};

export const deleteHelp = async (id: string): Promise<HelpType> => {
  try {
    const response = await api.delete<HelpType>(`/deleteHelp/${id}`); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir help:", error);
    throw error;
  }
};
