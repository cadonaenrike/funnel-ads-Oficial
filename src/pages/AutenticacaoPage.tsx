import { useState, useEffect } from "react";
import QRCode from "qrcode.react";

export default function Home() {
  const [segredo, setSegredo] = useState<{ otpauth_url: string } | null>(null);
  const [codigo, setCodigo] = useState("");
  const [resultadoVerificacao, setResultadoVerificacao] = useState("");

  useEffect(() => {
    async function obterSegredo() {
      try {
        const headers = {
          "content-type": "application/json",
        };

        // Inclui o cabeçalho 'api-key' apenas se ele existir
        if (process.env.NEXT_PUBLIC_APYKEY) {
          // @ts-ignore
          headers["api-key"] = process.env.NEXT_PUBLIC_APYKEY;
        }

        const resposta = await fetch(
          "https://funnelads.vercel.app/autenticacao",
          {
            method: "GET",
            headers: headers,
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

    const headers = {
      "content-type": "application/json",
    };

    // Inclui o cabeçalho 'api-key' apenas se ele existir
    if (process.env.NEXT_PUBLIC_APYKEY) {
      // @ts-ignore
      headers["api-key"] = process.env.NEXT_PUBLIC_APYKEY;
    }

    try {
      const resposta = await fetch(
        "https://funnelads.vercel.app//verificar-codigo",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({ codigo: codigo, segredo: segredo }),
        }
      );

      const dados = await resposta.json();
      setResultadoVerificacao(dados.mensagem);
    } catch (error) {
      console.error("Erro ao verificar o código:", error);
    }
  }
  return (
    <div style={{ padding: "160px 0px 0px 750px" }}>
      {segredo && (
        <QRCode
          value={segredo.otpauth_url}
          style={{ height: "350px", width: "350px" }}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          style={{ width: "231px" }}
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Digite o código"
        />
        <button type="submit">Verificar Código</button>
      </form>
      {resultadoVerificacao && <p>{resultadoVerificacao}</p>}
    </div>
  );
}
