import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAdm } from "@/services/GetUserService";

const useAdminCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const idUser = sessionStorage.getItem("idUser");
      console.log("ID do Usuário:", idUser);

      if (!idUser) {
        console.log(
          "Nenhum ID de usuário encontrado, redirecionando para o login..."
        );
        router.push("/Login"); // Redireciona para o login se não houver idUser
        return;
      }

      try {
        const isAdmin = await getAdm(Number(idUser));
        console.log("Resposta do getAdm:", isAdmin);

        if (isAdmin?.isadmin === false) {
          console.log(
            "Usuário não é admin ou ocorreu um erro, redirecionando..."
          );
          router.push("/Login");
        }
        // Se for admin, o hook não faz nada, permitindo que o usuário permaneça na página
      } catch (error) {
        console.error("Erro ao verificar o status de admin:", error);
        router.push("/Login"); // Redireciona para o login em caso de erro
      }
    };

    checkAdminStatus();
  }, [router]);
};

export default useAdminCheck;
