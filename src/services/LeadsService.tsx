import { LeadsType } from "@/types/LeadsType";
import api from "./Api";

// Adicionar um novo lead
export const addLead = async (
  lead: Omit<LeadsType, "id">
): Promise<LeadsType> => {
  try {
    const response = await api.post<LeadsType>("/postLeads", {
      nome: lead.nome,
      celular: lead.celular,
      email: lead.email,
      userid: lead.userid,
      tag: lead.tag.map((t) => t.id),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar lead:", error);
    throw error;
  }
};

// Obter todos os leads
export const getAllLeads = async (): Promise<LeadsType[]> => {
  try {
    const response = await api.get<LeadsType[]>("/getLeads");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter leads:", error);
    throw error;
  }
};
export const getLeadUserId = async (idUser: string): Promise<LeadsType[]> => {
  try {
    const response = await api.get<LeadsType[]>(`/getLeadsIdUser/${idUser}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao obter leads:", error);
    throw error;
  }
};

// Atualizar um lead existente
export const updateLead = async (
  id: string,
  lead: Omit<LeadsType, "id">
): Promise<LeadsType> => {
  try {
    const response = await api.put<LeadsType>(`/putLeads/${id}`, {
      nome: lead.nome,
      celular: lead.celular,
      email: lead.email,
      tag: lead.tag.map((t) => t.id),
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar lead:", error);
    throw error;
  }
};

// Excluir um lead
export const deleteLead = async (id: string): Promise<LeadsType> => {
  try {
    const response = await api.delete<LeadsType>(`/deleteLeads/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir lead:", error);
    throw error;
  }
};
