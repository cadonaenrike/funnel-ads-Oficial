import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import Image from "next/image";
import {
  FaArrowsRotate,
  FaCircleUser,
  FaRegEnvelope,
  FaShieldHalved,
  FaXmark,
} from "react-icons/fa6";

export default function MyProfile() {
  const [foto, setFoto] = useState<File | null>(null);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [cpf, setCpf] = useState("");
  const [celular, setCelular] = useState("");
  const [cargo, setCargo] = useState("");
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
    setCpf("");
    setCelular("");
    setCargo("");
    setNivelAcesso("");
    setEmail("");
  };

  const handleCancelar = () => {
    setFoto(null);
    setNome("");
    setSobrenome("");
    setCpf("");
    setCelular("");
    setCargo("");
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
    <>
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaCircleUser />
        <h1 className=" ml-2">Meu Perfil</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <div style={{ marginTop: "15px" }}>
          <form onSubmit={handleCadastro} className="relative">
            {/* div foto upload */}
            <div style={{ paddingBottom: "15px" }}>
              <label
                style={{
                  color: "#022D46",
                  cursor: "pointer",
                  fontSize: "20px",
                  fontWeight: "600",
                }}
                htmlFor="foto"
                onClick={handleImageClick}
              >
                Meus Dados
              </label>
              <Image
                className="border-2 rounded-md border-dashed"
                src={
                  foto
                    ? URL.createObjectURL(foto)
                    : "/public/images/downloadImg.png"
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

            <section className="flex flex-col absolute  top-12 right-0 w-2/3 items-center justify-between">
              <section className="w-full flex items-center justify-between border-b-2 pb-3 mb-2">
                <label htmlFor="">E-mail atual</label>
                <button className="bg-amber-500 w-40 h-11 rounded-lg font-semibold text-white flex items-center justify-center gap-3 p-2">
                  <FaRegEnvelope />
                  Alterar E-mail
                </button>
              </section>

              <section className="w-full flex justify-between items-center border-b-2 pb-3">
                <section className="flex flex-col">
                  <label htmlFor="">Senha atual</label>
                  <label htmlFor="">*******</label>
                </section>
                <button className="bg-amber-500 w-40 h-11 rounded-lg font-semibold text-white flex items-center justify-center gap-3 p-2">
                  <FaShieldHalved />
                  Alterar Senha
                </button>
              </section>
            </section>

            <div className="flex flex-row gap-5  w-3">
              <div>
                <label style={{ color: "#022D46" }} htmlFor="nome">
                  Nome:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="nome"
                  name="nome"
                  value={nome}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#022D46" }} htmlFor="sobrenome">
                  Sobrenome:
                </label>
                <br />
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="sobrenome"
                  name="sobrenome"
                  value={sobrenome}
                  style={{ width: "820px", height: "44px" }}
                  onChange={(e) => setSobrenome(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-row w-3 gap-5">
              <div>
                <label style={{ color: "#022D46" }} htmlFor="cpf">
                  CPF:
                </label>
                <input
                  className="rounded-lg read-only:bg-gray-300 pl-2"
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={cpf}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) => setCpf(e.target.value)}
                  disabled
                />
              </div>

              <div>
                <label style={{ color: "#022D46" }} htmlFor="celular">
                  Celular:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="celular"
                  name="celular"
                  value={celular}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) => setCelular(e.target.value)}
                />
              </div>

              <div>
                <label style={{ color: "#022D46" }} htmlFor="cargo">
                  Cargo:
                </label>
                <input
                  className="rounded-lg bg-gray-100 pl-2 read-only:bg-gray-300"
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={cargo}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) => setCargo(e.target.value)}
                  disabled
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-1 w-3">
              <div>
                <label style={{ color: "#022D46" }} htmlFor="nivelAcesso">
                  Nível de Acesso:
                </label>
                <br />
                <select
                  className="rounded-lg read-only:bg-gray-300 pl-2"
                  id="nivelAcesso"
                  name="nivelAcesso"
                  value={nivelAcesso}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) => setNivelAcesso(e.target.value)}
                  disabled
                >
                  <option value="1">Nível 1</option>
                  <option value="2">Nível 2</option>
                  <option value="3">Nível 3</option>
                </select>
              </div>

              <div style={{ paddingLeft: "15px" }}>
                <label style={{ color: "#022D46" }} htmlFor="email">
                  E-mail:
                </label>
                <br />
                <input
                  className="rounded-lg read-only:bg-gray-300 pl-2"
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  style={{ width: "820px", height: "44px" }}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>

            <hr className="my-4 w-full " />

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
                className="hover:bg-sky-700 font-semibold text-white"
                style={{
                  backgroundColor: "#064b72",
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
                <FaArrowsRotate className="mr-5" />
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
