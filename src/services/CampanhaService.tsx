import { Campanha } from "@/types/PasteTypes";
import api from "./Api";

// Adicionar uma nova campanha a uma pasta específica
export const addCampanhaToPasta = async (
  pastaId: string,
  campanha: Omit<Campanha, "id" | "pasta_id"> // Assumindo que pasta_id não é necessário na criação
): Promise<Campanha> => {
  try {
    const response = await api.post<Campanha>(
      `/api/campanhas/pastas/${pastaId}`,
      campanha
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar campanha:", error);
    throw error;
  }
};

// Obter todas as campanhas
export const getCampanhas = async (): Promise<Campanha[]> => {
  try {
    const response = await api.get<Campanha[]>("/campanhas");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter campanhas:", error);
    throw error;
  }
};
export const getCampanhasIdUser = async (
  idUser: string
): Promise<Campanha[]> => {
  try {
    const response = await api.get<Campanha[]>(`/getCampanhasIdUser/${idUser}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter campanhas:", error);
    throw error;
  }
};
export const getCampanhasById = async (
  idPasta: string
): Promise<Campanha[]> => {
  try {
    const response = await api.get<Campanha[]>(`/getCampanhas/${idPasta}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter campanhas:", error);
    throw error;
  }
};

// Atualizar uma campanha existente
export const updateCampanha = async (
  campanhaId: string,
  campanha: Omit<Campanha, "id" | "pasta_id">
): Promise<Campanha> => {
  try {
    const response = await api.put<Campanha>(
      `/editarCampanhas/${campanhaId}`, // Rota atualizada
      campanha
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar campanha:", error);
    throw error;
  }
};

// Deletar uma campanha
export const deleteCampanha = async (campanhaId: string): Promise<void> => {
  try {
    await api.delete(`/deleteCampanhas/${campanhaId}`);
  } catch (error) {
    console.error("Erro ao deletar campanha:", error);
    throw error;
  }
};
