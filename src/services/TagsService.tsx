import { TagsType } from "@/types/TagsType";
import api from "./Api";

// Adicionar uma nova tag
export const addTag = async (nome: string): Promise<TagsType> => {
  try {
    const response = await api.post<TagsType>("/postTags", { nome }); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar tag:", error);
    throw error;
  }
};

// Atualizar uma tag existente
export const updateTag = async (
  tagName: string,
  newTagName: string
): Promise<TagsType> => {
  try {
    const response = await api.put<TagsType>(`/putTags/${tagName}`, {
      newTagName,
    }); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar tag:", error);
    throw error;
  }
};

// Obter todas as tags
export const getAllTags = async (): Promise<TagsType[]> => {
  try {
    const response = await api.get<TagsType[]>("/getTags"); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao obter tags:", error);
    throw error;
  }
};

// Excluir uma tag
export const deleteTag = async (tagName: string): Promise<TagsType> => {
  try {
    const response = await api.delete<TagsType>(`/deleteTags/${tagName}`); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir tag:", error);
    throw error;
  }
};
