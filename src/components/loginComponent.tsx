import React, { useState } from "react";
import { Poppins } from "next/font/google";
import Button from "@/components/button";
import { useRouter } from "next/router";
import * as yup from "yup";
import Link from "next/link";
import { LoginService } from "@/services/LoginService";
import { getAdm } from "@/services/GetUserService";
import { MdError } from "react-icons/md";
import ErrorAlert from "./errorAlert";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

const emailSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
});

export default function LoginComponent() {
  const [senha, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleEmail = async (e: any) => {
    setEmail(e.target.value);

    try {
      await emailSchema.validate({ email: e.target.value });
      setEmailValid(true);
      setEmailError("");
    } catch (error: any) {
      setEmailValid(false);
      setEmailError(error.message);
    }
  };

  const lidarComMudancaInput = (e: any) => {
    setPassword(e.target.value);
  };

  const logar = async () => {
    // Resetando mensagens de erro a cada tentativa de login
    setError("");

    if (email === "") {
      setError("Favor digite um email válido");
      return;
    } else if (senha === "") {
      setError("Favor digite uma senha válida");
      return;
    }

    try {
      setLoading(true);
      const response = await LoginService.login({ email, senha });
      sessionStorage.setItem("isAdm", `${response?.data.user.isadmin}`);
      setLoading(false); // Parando o loading independentemente do resultado

      if (response && response.status === 200) {
        const admResponse = response.data.user.isadmin;
        const userId = response.data.user.id;
        localStorage.setItem("isAdm", `${admResponse}`);
        sessionStorage.setItem("isAdm", `${admResponse}`);

        sessionStorage.setItem("idUser", `${userId}`);

        console.log(admResponse);

        if (response.data.user.dfatores === true) {
          router.push("/AutenticacaoPage");
          return;
        }

        try {
          if (admResponse === "true") {
            router.push("/ADM/Dashboard");
          } else {
            router.push("/CLIENTE/DashboardClient");
          }
        } catch (error) {
          setError(`Erro ao verificar status de administrador: ${error}`);
        }
      } else {
        setError("E-mail ou senha inválidos");
        router.push("/Login");
      }
    } catch (error) {
      console.error("Erro ao tentar logar", error);
      setError("Falha ao receber a resposta do servidor");
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1
        className={`text-center text-2xl font-semibold m-0 mt-8 text-slate-800 ${poppins.className}`}
      >
        Bem-vindo de volta
      </h1>
      <a
        className=" text-base font-medium m-0 mt-5 text-slate-800  hover:text-sky-500"
        href={"/SignUp"}
      >
        É Novo Aqui?{" "}
        <span className=" text-sky-500 hover:text-slate-800 ">
          Crie uma Conta
        </span>
      </a>
      <input
        type="email"
        className={`placeholder:text-cyan-600 p-3 focus:bg-slate-50 focus:outline-none w-full ${
          poppins.className
        }font-semibold ${
          emailValid ? "rounded-t-xl" : "rounded-lg"
        } focus:ring-1 focus:ring-blue-500`}
        placeholder="Seu email"
        value={email}
        onChange={handleEmail}
      />
      {emailValid && (
        <input
          className="placeholder:text-cyan-600 p-3 focus:bg-slate-50 focus:outline-none w-full rounded-b-xl focus:ring-1 focus:ring-blue-500"
          type="password"
          value={senha}
          onChange={lidarComMudancaInput}
          placeholder="*******"
        />
      )}
      {!emailValid && emailError && (
        <p className="text-red-500 text-sm">{emailError}</p>
      )}
      <Button
        loading={loading}
        image="/icons/icon-login-button.svg"
        onClickFunction={logar}
        className="mt-4"
      >
        Login
      </Button>
      {error && <ErrorAlert text={error} />}
      <Link
        className=" text-base font-medium m-0 mt-5 text-black hover:text-sky-500"
        href={"/RecoverPassword"}
      >
        <span
          className={`text-black text-sm mt-5 hover:text-sky-500 ${poppins.className}`}
        >
          Esqueceu sua senha?
        </span>
      </Link>
    </div>
  );
}
