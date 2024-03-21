import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";

export default function Home() {
  const [segredo, setSegredo] = useState<{ otpauth_url: string } | null>(null);
  const [codigo, setCodigo] = useState("");
  const [resultadoVerificacao, setResultadoVerificacao] = useState("");
  const idusuario = sessionStorage.getItem("idUser");
  const router = useRouter();

  useEffect(() => {
    async function obterSegredo() {
      try {
        const resposta = await fetch(
          `https://server-self-pi.vercel.app/autenticacao/${idusuario}`,
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
        "https://server-self-pi.vercel.app/autenticacao/verificar-codigo",
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
      router.push("/CLIENTE/Configuracao-Client");
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  }

  return (
    <div className="flex justify-center pt-16 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 border border-gray-300 shadow-lg rounded-2xl">
          {segredo && (
            <QRCode
              value={segredo.otpauth_url}
              size={256}
              style={{ margin: "auto" }}
            />
          )}
          <h2 className="text-center text-2xl font-semibold my-4">
            DIGITE O CÓDIGO
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Digite o código"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Verificar Código
            </button>
          </form>
          {resultadoVerificacao && (
            <p className="text-center text-green-600 font-medium mt-4">
              {resultadoVerificacao}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
