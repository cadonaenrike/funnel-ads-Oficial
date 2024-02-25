import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { FaRegFloppyDisk, FaUser, FaXmark } from "react-icons/fa6";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
export default function NovoUsuarioClient() {
  const [foto, setFoto] = useState<File | null>();
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [celular, setCelular] = useState("");
  const [nivelAcesso, setNivelAcesso] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

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
    setCelular("");
    setNivelAcesso("");
    setEmail("");
  };

  const handleCancelar = () => {
    setFoto(null);
    setNome("");
    setSobrenome("");
    setCelular("");
    setNivelAcesso("");
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
    <section className={`${poppins.className}`}>
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-3xl mt-10 mb-5">
        <FaUser />
        <h1 className="ml-2 font-semibold">Meus Usuários</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col font-medium p-5">
        <div style={{ marginTop: "15px" }}>
          <form onSubmit={handleCadastro}>
            {/* div foto upload */}
            <div style={{ paddingBottom: "15px" }}>
              <label
                style={{
                  color: "#023047",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
                htmlFor="foto"
                onClick={handleImageClick}
              >
                Cadastrar um usúario (colaborador)
              </label>
              <Image
                className="border-2 rounded-md border-dashed"
                src={
                  foto
                    ? URL.createObjectURL(foto)
                    : "/images/exampleImagFile.png"
                }
                alt="Foto selecionada"
                style={{
                  marginTop: "10px",
                  width: "343px",
                  height: "150px",
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
            </div>

            <div className="flex flex-row gap-4  w-full mt-5">
              <div className="flex flex-col w-2/6">
                <label style={{ color: "#022D46" }} htmlFor="nome">
                  Nome:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none p-2"
                  type="text"
                  id="nome"
                  placeholder="Primeiro nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="flex flex-col w-2/6">
                <label style={{ color: "#022D46" }} htmlFor="sobrenome">
                  Sobrenome:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none p-2"
                  type="text"
                  id="sobrenome"
                  placeholder="Sobrenome"
                  name="sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-2/6">
                <label style={{ color: "#022D46" }} htmlFor="celular">
                  Celular:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none p-2"
                  type="text"
                  placeholder="(00) 00000-0000"
                  id="celular"
                  name="celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-5 w-full mt-5">
              <div className="flex flex-col w-2/6">
                <label style={{ color: "#022D46" }} htmlFor="nivelAcesso">
                  Nível de Acesso:
                </label>
                <select
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none p-2"
                  id="nivelAcesso"
                  name="nivelAcesso"
                  value={nivelAcesso}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                >
                  <option value="0">Selecione...</option>
                  <option value="1">Financeiro</option>
                  <option value="2">Operador</option>
                  <option value="3">Gerente</option>
                </select>
              </div>

              <div className="flex flex-col w-8/12">
                <label style={{ color: "#022D46" }} htmlFor="email">
                  E-mail:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none p-2"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <hr className="my-4 w-full " />

            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginTop: "20px",
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
                className="hover:bg-slate-600 font-semibold text-white"
                style={{
                  backgroundColor: "#023047",
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
                <FaRegFloppyDisk className="mr-5" />
                Salvar
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}
