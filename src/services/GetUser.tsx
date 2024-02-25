import axios from "axios";
import { UserTypes } from "@/types/UserType";
import api from "./Api";

export const fetchUserData = async (
  user: string | null
): Promise<UserTypes | null> => {
  try {
    if (user) {
      const response = await api.get<UserTypes[]>(`/usuarios`);
      if (response.status === 200) {
        const userData = response.data.find(
          (userData) => userData.nome === user
        );
        return userData || null;
      }
    }
    return null;
  } catch (error) {
    console.error("Erro ao tentar buscar dados do usuário", error);
    return null;
  }
};

// Adicionando o método getAdm
export const getAdm = async (id: number): Promise<UserTypes | null> => {
  try {
    const response = await api.get<UserTypes>(`/getAdmin/${id}`);
    if (response.status === 200) {
      return response.data; // Retorna os dados do administrador
    }
    return null;
  } catch (error) {
    console.error(
      `Erro ao tentar buscar dados do administrador com ID ${id}`,
      error
    );
    return null;
  }
};
