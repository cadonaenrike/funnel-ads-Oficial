import { Invoice } from "@/types/InvoiceTypes";
import api from "./Api";

export const getCustomerIdByCpf = async (cpf: string): Promise<string> => {
  const response = await api.get(`assasUser/customers/${cpf}`);
  if (response.status !== 200) {
    throw new Error("Erro ao buscar Id");
  }
  return response.data.data[0].id; // Ajuste de acordo com a estrutura real da sua resposta
};

export const getInvoicesByUserId = async (
  userId: string
): Promise<Invoice[]> => {
  const response = await api.get(`assasFatura/payments/customer/${userId}`);
  if (response.status !== 200) {
    throw new Error("Erro ao buscar faturas");
  }
  return response.data.data; // Ajuste de acordo com a estrutura real da sua resposta
};
