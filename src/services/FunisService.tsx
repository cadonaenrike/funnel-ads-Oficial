import api from "./Api";

export const getFunis = async (userId: string): Promise<any[]> => {
  try {
    const response = await api.get<any>("/whatsFluxGet/" + userId);
    console.log(response);
    
    return response.data;
  } catch (error) {
    console.error("Erro ao obter campanhas:", error);
    throw error;
  }
};
