import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import {
  FaCircleUser,
  FaFloppyDisk,
  FaLocationDot,
  FaPencil,
  FaXmark,
} from "react-icons/fa6";
import CardsMyData from "./cardsMyData";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";
import { FaExclamationCircle } from "react-icons/fa";
import { GetUserById, updateUserById } from "@/services/GetUserService";

export default function MyData() {
  const [foto, setFoto] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [desativarConta, setDesativarConta] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDesativarConta = () => {
    setDesativarConta(!desativarConta);
  };

  const clickDesativarConta = () => {
    console.log("Conta desativada");
  };

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  function formatarTelefone(telefone: number | string) {
    // Remove caracteres não numéricos
    const numeros = telefone.toString().replace(/\D/g, "");

    // Aplica a formatação
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  useEffect(() => {
    async function getUser() {
      const user = await GetUserById();
      console.log(user);

      setNome(user?.nome || "");
      setSobrenome(user?.sobrenome || "");
      setCpf(user?.cpf || "");
      setTelefone(user?.telefone || "");
      setNomeFantasia(user?.nomeFantasia || "");
      setRazaoSocial(user?.razaoSocial || "");
      setEmail(user?.email || "");
      setCnpj(user?.cnpj || "");
      setCep(user?.cep || "");
      setEndereco(user?.endereco || "");
      setNumero(user?.numero || "");
      setComplemento(user?.complemento || "");
      setBairro(user?.bairro || "");
      setCidade(user?.cidade || "");
      setEstado(user?.estado || "");
    }
    getUser();
  }, []);

  const handleCadastro = (e: FormEvent) => {
    e.preventDefault();
    async function cadastro() {
      if (loading) return;
      e.preventDefault();
      setLoading(true);
      await updateUserById({
        nome,
        sobrenome,
        cpf,
        nome_fantasia: nomeFantasia,
        razao_social: razaoSocial,
        cnpj: cnpj,
        telefone: telefone,
        cep,
        endereco,
        numero: numero,
        complemento,
        bairro,
        cidade,
        estado,
      });
      alert("Usuário atualizado com sucesso.");

      setLoading(false);
    }
    cadastro();
  };

  const handleCancelar = () => {
    setFoto(null);
    setNome("");
    setSobrenome("");
    setCpf("");
    setTelefone("");
    setNomeFantasia("");
    setRazaoSocial("");
    setEmail("");
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const arquivoSelecionado = files[0];
      setFoto(arquivoSelecionado);
    }
  };

  function formatarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "");
    return cepLimpo.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }

  function formatarCNPJ(cnpj: string) {
    const cnpjLimpo = cnpj.replace(/\D/g, "");
    return cnpjLimpo.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
  }

  return (
    <>
      <section className="flex max-w-screen-xl mx-auto items-center text-sky-950 text-xl mt-10 mb-5">
        <FaCircleUser />
        <h1 className=" font-semibold ml-2 ">Meus Dados</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex justify-around  p-5 rounded-lg shadow-lg items-center">
        <Image
          className="border-2 rounded-md border-dashed"
          src={foto ? URL.createObjectURL(foto) : "/images/imgFoto.png"}
          alt="Foto selecionada"
          style={{
            marginTop: "10px",
            width: "200px",
            height: "150px",
            objectFit: "cover",
            cursor: "pointer",
          }}
          width={200}
          height={150}
        />
        <section className="flex flex-col m-3">
          <section className="flex flex-col m-4">
            <h2 className="font-semibold text-xl"> {nome}</h2>
            <section
              className="flex
              gap-5
            "
            >
              <p className="flex items-center">
                <MdOutlinePhone className="m-1" /> {formatarTelefone(telefone)}
              </p>
              <p className="flex items-center">
                <MdOutlineEmail className="m-1" /> {email}
              </p>
            </section>
          </section>
          <section className="flex gap-5 ">
            <CardsMyData title="Leads" value="0">
              <MdKeyboardArrowUp className="text-green-500 text-5xl" />
            </CardsMyData>
            <CardsMyData title="Campanhas" value="0">
              <MdKeyboardArrowDown className="text-red-500 text-5xl" />
            </CardsMyData>
            <CardsMyData title="Funil" value="0">
              <MdKeyboardArrowRight className="text-cyan-600 text-5xl" />
            </CardsMyData>
          </section>
        </section>
        <section className="bg-slate-100 p-4 w-4/12 flex flex-col rounded-xl text-start justify-center">
          <p className="text-base font-semibold m-4">
            CNPJ: <span className="font-normal">{formatarCNPJ(cnpj)}</span>
          </p>
          <p className="text-base font-semibold flex m-4">
            <FaLocationDot className={"mr-1 "} />
            <span className="font-normal">{`${cidade} - ${estado}`}</span>
          </p>
          <p className="text-base font-semibold m-4">
            CEP: <span className="font-normal">{formatarCEP(cep)}</span>
          </p>
        </section>
      </section>

      <section className="bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <label
          style={{
            color: "#022D46",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Editar Dados
        </label>
        <hr className="my-5" />
        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-5">
          <section className="flex w-3/6 gap-64 flex-row items-center">
            <p className="">Logotipo:</p>
            <section className="relative -ml-3">
              <section className="bg-white border -right-2 w-8 h-8 flex items-center justify-center rounded-full hover:text-cyan-500 absolute">
                <FaPencil className=" text-xs " />
              </section>

              <Image
                className="border-white shadow-2xl border-2 rounded-md mb-2"
                src={foto ? URL.createObjectURL(foto) : "/images/imgFoto.png"}
                alt="Foto selecionada"
                style={{
                  marginTop: "10px",
                  width: "123px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={handleImageClick}
                width={343}
                height={150}
              />
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                style={{ display: "none" }}
                ref={inputRef}
                onChange={handleFileChange}
              />
            </section>
          </section>

          <section className="flex w-full justify-between items-center">
            <label style={{ color: "#022D46" }} htmlFor="nome">
              Nome do Responsável:
            </label>

            <section className="gap-5 flex w-9/12">
              <input
                className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none h-11 w-6/12 pl-2"
                type="text"
                id="nome"
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input
                className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none h-11 w-6/12 pl-2"
                type="text"
                id="sobrenome"
                name="sobrenome"
                value={sobrenome}
                onChange={(e) => setSobrenome(e.target.value)}
              />
            </section>
          </section>

          <section className="flex items-center w-full justify-between">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="nomeFantasia">Nome Fantasia:</label>
            <input
              type="text"
              name="nomeFantasia"
              placeholder=""
              value={nomeFantasia}
              onChange={(e) => setNomeFantasia(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="razaoSocial">Razão Social:</label>
            <input
              type="text"
              name="razaoSocial"
              placeholder=""
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="cnpj">CNPJ:</label>
            <input
              type="text"
              name="cnpj"
              placeholder="000.000.000/0000-00"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              name="cep"
              placeholder="00000-000"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              name="endereco"
              placeholder=""
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="numero">Número:</label>
            <input
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              type="text"
              name="numero"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="complemento">Complemento:</label>
            <input
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              type="text"
              name="complemento"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="bairro">Bairro:</label>
            <input
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              type="text"
              name="bairro"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="cidade">Cidade:</label>
            <input
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              type="text"
              name="cidade"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="estado">Estado:</label>
            <input
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              type="text"
              name="estado"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <button
              className="font-medium gap-5"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#022D46",
                height: "44px",
                width: "160px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="button"
              onClick={handleCancelar}
            >
              <FaXmark />
              Cancelar
            </button>

            <button
              disabled={loading}
              className="hover:bg-cyan-600 font-semibold text-white bg-sky-900"
              style={{
                marginLeft: "15px",
                height: "44px",
                width: "160px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
            >
              {loading ? (
                <span className="loader" />
              ) : (
                <>
                  {" "}
                  <FaFloppyDisk className="mr-5" /> Salvar{" "}
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <p className="text-slate-800 font-semibold text-xl">Desativar Conta</p>
        <hr className="my-5" />
        <section className="border-dotted gap-5 border-2 rounded-lg border-yellow-400 bg-yellow-50 p-6 flex items-center">
          <FaExclamationCircle className="text-yellow-400 text-4xl" />
          <section>
            <h3 className="font-normal text-lg">
              Você tem certeza de que deseja desativar sua conta?
            </h3>
            <p className="text-sm">
              Conforme exigido pelas leis de privacidade de dados, desativaremos
              sua conta conforme solicitado. Seus dados serão mantidos em nosso
              banco de dados por um período de 5 anos. Após esse período, todos
              os seus dados pessoais serão anonimizados.
            </p>
          </section>
        </section>

        <section className="flex items-center gap-4 my-5">
          <input
            type="checkbox"
            name="desativarConta"
            id="desativarConta"
            checked={desativarConta}
            onChange={handleDesativarConta}
          />
          <label htmlFor="desativarConta" className="text-sm">
            Eu confirmo a desativação da minha conta
          </label>
        </section>

        <hr className="mb-5" />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            className="font-semibold text-white bg-rose-600 px-10 py-3 disabled:bg-gray-400"
            style={{
              marginLeft: "15px",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            disabled={!desativarConta}
            onClick={handleDesativarConta}
          >
            Desativar Conta
          </button>
        </div>
      </section>
    </>
  );
}
