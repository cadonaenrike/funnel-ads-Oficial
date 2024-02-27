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
  descrição?: string
): Promise<PlanType> => {
  try {
    const response = await api.put<PlanType>(`/putPlan/${id}`, {
      id,
      nome,
      valor,
      descrição,
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
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Erro ao obter plans:", error);
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
