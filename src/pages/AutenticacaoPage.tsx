import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { useRouter } from "next/router";
import Button from "@/components/button";

export default function Home() {
  const [segredo, setSegredo] = useState<{ otpauth_url: string } | null>(null);
  const [codigo, setCodigo] = useState("");
  const [resultadoVerificacao, setResultadoVerificacao] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function obterSegredo() {
      try {
        const resposta = await fetch(
          "https://server-self-pi.vercel.app/autenticacao",
          {
            headers: {
              "api-key": "tpfTech",
            },
          }
        );
        const dados = await resposta.json();
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
      console.log(dados);
      if (dados.mensagem === "Código incorreto") {
        alert("Código incorreto");
        return;
      } else {
        const Admin = sessionStorage.getItem("isAdm");
        if (Admin !== null) {
          if (Admin === "true") {
            router.push("/ADM/Dashboard");
          } else {
            router.push("CLIENTE/DashboardClient");
          }
        } else {
          router.push("/Login");
        }
      }
      setResultadoVerificacao(dados.mensagem);
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {segredo && (
        <div className="mb-4">
          <h1 className="mb-6 text-3xl font-bold text-center text-slate-800">
            Escaneie o QR Code
          </h1>
          <QRCode value={segredo.otpauth_url} size={300} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <input
          type="text"
          className="w-full px-3 py-3 leading-tight text-amber-500 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Digite o código"
        />
        <button
          type="submit"
          className="w-full px-4 py-4 mt-4 rounded-3xl text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:shadow-outline"
        >
          Verificar Códig0
        </button>
      </form>

      {resultadoVerificacao && (
        <div className="mt-4 text-center text-red-500">
          {resultadoVerificacao}
        </div>
      )}
    </div>
  );
}
