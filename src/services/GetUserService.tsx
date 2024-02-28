import { UserTypes } from "@/types/UserType";
import api from "./Api";

export interface AdminStatus {
  isadmin: boolean;
}

export const fetchAllUsers = async (): Promise<UserTypes[] | null> => {
  try {
    const response = await api.get<UserTypes[]>("/usuarios");
    if (response.status === 200) {
      return response.data; // Retorna a lista de usuários
    }
    return null;
  } catch (error) {
    console.error("Erro ao tentar buscar todos os usuários", error);
    return null;
  }
};
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
export const getAdm = async (id: number): Promise<AdminStatus | null> => {
  try {
    const response = await api.get<AdminStatus>(`/usuarios/isAdmin/${id}`);

    if (response.data) {
      return response.data; // Retorna o status de administrador
    } else {
      return null; // Retorna null se a resposta não contiver dados
    }
  } catch (error) {
    console.error("Erro ao tentar verificar status de administrador", error);
    return null; // Retorna null em caso de erro na requisição
  }
};

// Método para buscar dados do usuário por ID
export const GetUserById = async (): Promise<UserTypes | null> => {
  const userId = sessionStorage.getItem("idUser");
  try {
    const response = await api.get<UserTypes>(`/getUsuarios/${userId}`);
    if (response.status === 200) {
      return response.data; // Retorna os dados do usuário
    }
    return null;
  } catch (error) {
    console.error("Erro ao tentar buscar usuário por ID", error);
    return null;
  }
};

// Método para atualizar dados do usuário por ID
export const updateUserById = async (
  userData: Partial<UserTypes>
): Promise<boolean> => {
  console.log(userData);

  const userId = sessionStorage.getItem("idUser");
  const filteredNull = Object.fromEntries(
    Object.entries(userData).filter(([_, valor]) => valor !== null)
  );

  try {
    const response = await api.put(`/putUsuarios/${userId}`, filteredNull);

    if (response.status === 200) {
      return true; // Retorna true se a atualização foi bem-sucedida
    }
    return false;
  } catch (error) {
    console.error("Erro ao tentar atualizar usuário por ID", error);
    return false;
  }
};

// Método para deletar um usuário por ID
export const deleteUserById = async (
  userId: string | null
): Promise<boolean> => {
  try {
    if (!userId) {
      console.error("ID do usuário não fornecido");
      return false;
    }

    const response = await api.delete(`/deleteUsuario/${userId}`);
    if (response.status === 200 || response.status === 204) {
      console.log("Usuário deletado com sucesso");
      return true; // Retorna true se a deleção foi bem-sucedida
    }
    return false;
  } catch (error) {
    console.error("Erro ao tentar deletar usuário por ID", error);
    return false;
  }
};
