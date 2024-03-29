import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";

import { FaLocationDot, FaPencil, FaRotate, FaXmark } from "react-icons/fa6";
import CardsMyData from "./cardsMyData";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
  MdOutlineEmail,
  MdOutlinePhone,
} from "react-icons/md";

export default function DadosCadClient() {
  const [foto, setFoto] = useState<File | null>(null);
  const [nome, setNome] = useState("teste");
  const [sobrenome, setSobrenome] = useState("");
  const [cnpj, setCnpj] = useState("teste");
  const [cep, setCep] = useState("teste");
  const [endereco, setEndereco] = useState("teste");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("(00) 0000-0000");
  const [telefone, setTelefone] = useState("(00) 0000-0000");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [email, setEmail] = useState("teste@teste");
  const inputRef = useRef<HTMLInputElement>(null);
  const [desativarConta, setDesativarConta] = useState(false);

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

  const handleCadastro = (e: FormEvent) => {
    e.preventDefault();
    setFoto(null);
    setNome("");
    setSobrenome("");
    setCpf("");
    setCelular("");
    setNomeFantasia("");
    setRazaoSocial("");
    setEmail("");
  };

  const handleCancelar = () => {
    setFoto(null);
    setNome("");
    setSobrenome("");
    setCpf("");
    setCelular("");
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

  return (
    <section className="w-full">
      <section className="bg-white mx-auto flex justify-around p-5 border-b items-center">
        <Image
          className="rounded-lg shadow-lg"
          src={foto ? URL.createObjectURL(foto) : "/images/imgFoto.png"}
          alt="Foto selecionada"
          style={{
            marginTop: "10px",
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
                <MdOutlinePhone className="m-1" /> {celular}
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
            CNPJ: <span className="font-normal">{cnpj}</span>
          </p>
          <p className="text-base font-semibold flex m-4">
            <FaLocationDot className={"mr-1 "} />
            <span className="font-normal">{endereco}</span>
          </p>
          <p className="text-base font-semibold m-4">
            CEP: <span className="font-normal">{cep}</span>
          </p>
        </section>
      </section>

      <section className="bg-white max-w-screen-xl mx-auto flex flex-col p-5">
        <label
          className="text-2xl"
          style={{
            color: "#022D46",
            fontWeight: "600",
          }}
        >
          Editar Dados
        </label>

        <form onSubmit={handleCadastro} className="w-full flex flex-col gap-5">
          <section className="flex w-3/6 gap-64 flex-row items-center">
            <p className="">Logotipo:</p>
            <section className="relative -ml-9">
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
              type="text"
              name="numero"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text"
              name="complemento"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              name="bairro"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              name="cidade"
              placeholder=""
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2 h-11 w-9/12"
            />
          </section>
          <section className="flex items-center w-full justify-between">
            <label htmlFor="estado">Estado:</label>
            <input
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
              Cancelar
            </button>

            <button
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
              <FaRotate className="mr-5" />
              Atualizar
            </button>
          </div>
        </form>
      </section>
    </section>
  );
}
