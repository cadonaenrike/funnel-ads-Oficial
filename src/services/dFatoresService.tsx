import api from "./Api";

export const updateDfatores = async (dfatoresValue: boolean) => {
  // Garantindo que o userId é uma string ou null
  const userId = sessionStorage.getItem("idUser");
  if (!userId) {
    console.error("UserID não encontrado na sessão");
    return false;
  }

  try {
    const response = await api.put(`/putFatores/${userId}`, {
      dfatores: dfatoresValue,
    });

    if (response.status === 200) {
      console.log("Dfatores atualizado com sucesso");
      return true;
    } else {
      console.error("Resposta da API não foi 200", response);
      return false;
    }
  } catch (error) {
    console.error("Erro ao atualizar dfatores", error);
    return false;
  }
};
