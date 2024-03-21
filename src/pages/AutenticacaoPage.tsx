import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import QRCode from "qrcode.react";

export default function Home() {
  const [segredo, setSegredo] = useState<{ otpauth_url: string } | null>(null);
  const [codigo, setCodigo] = useState("");
  const [resultadoVerificacao, setResultadoVerificacao] = useState("");
  const [idusuario, setIdusuario] = useState("");
  const router = useRouter();

  if (typeof window !== "undefined") {
    setIdusuario(sessionStorage.getItem("idUser")!);
  }
  useEffect(() => {
    async function obterSegredo() {
      try {
        const resposta = await fetch(
          `https://server-self-pi.vercel.app/authInitial/${idusuario}`,
          {
            headers: {
              "api-key": "tpfTech",
            },
          }
        );
        const dados = await resposta.json();
        console.log(dados);

        setSegredo(dados.segredo);
      } catch (error) {
        console.error("Erro ao obter o segredo:", error);
      }
    }

    obterSegredo();
  }, []);

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      const resposta = await fetch(
        "https://server-self-pi.vercel.app/authInitial/verificar-codigo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "api-key": "tpfTech",
          },
          body: JSON.stringify({ codigo: codigo, segredo: segredo }),
        }
      );

      const dados = await resposta.json();
      setResultadoVerificacao(dados.mensagem);
      if (resposta.status === 200) {
        router.push("/CLIENTE/DashboardClient");
      } else {
        alert("Erro ao verificar o código");
      }
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-10 bg-white shadow rounded-lg">
        <h2 className="mt-6 text-center text-xl font-bold text-gray-900">
          DIGITE O CÓDIGO DE AUTENTICAÇÃO DE 2 FATORES
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="text"
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Digite o código"
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Verificar Código
          </button>
        </form>
        {resultadoVerificacao && (
          <div className="text-center mt-4 text-sm font-medium text-red-500">
            {resultadoVerificacao}
          </div>
        )}
      </div>
    </div>
  );
}
