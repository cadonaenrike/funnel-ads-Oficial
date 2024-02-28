import { PlanType } from "@/types/PlanType";
import api from "./Api";

export const addPlan = async (data: PlanType): Promise<PlanType> => {
  try {
    const response = await api.post<PlanType>("/postPlan", data); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar plan:", error);
    throw error;
  }
};

export const updatePlan = async (
  id: string,
  nome?: string,
  valor?: number,
  descricao?: string
): Promise<PlanType> => {
  try {
    const response = await api.put<PlanType>(`/putPlan/${id}`, {
      id,
      nome,
      valor,
      descricao,
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar plan:", error);
    throw error;
  }
};

export const getAllPlans = async (): Promise<PlanType[]> => {
  try {
    const response = await api.get<PlanType[]>("/getPlans");
    return response.data || [];
  } catch (error) {
    console.error("Erro ao obter plans:", error);
    throw error;
  }
};

export const getPlanById = async (id: string): Promise<PlanType | null> => {
  try {
    const response = await api.get<PlanType>(`/getPlansId/${id}`);
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao obter o plano com ID ${id}:`, error);
    throw error;
  }
};

export const deletePlan = async (id: string): Promise<PlanType> => {
  try {
    const response = await api.delete<PlanType>(`/deletePlan/${id}`); // Ajuste na URL
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir plan:", error);
    throw error;
  }
};
