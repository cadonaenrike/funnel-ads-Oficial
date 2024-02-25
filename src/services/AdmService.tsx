import { useEffect } from "react";
import { useRouter } from "next/router";
import { getAdm } from "@/services/GetUser"; // Ajuste o caminho de importação conforme necessário

const useAdminCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const idUser = sessionStorage.getItem("idUser");
      console.log(idUser);

      if (!idUser) {
        router.push("/Login"); // Redireciona para o login se não houver idUser
        return;
      }

      try {
        const response = await getAdm(Number(idUser));
        console.log(response);
        if (!response) {
          console.log("oi mula");
          router.push("/login"); // Redireciona para a dashboard do cliente se não for admin
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
