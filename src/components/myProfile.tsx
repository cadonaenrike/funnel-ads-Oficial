import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  FaArrowsRotate,
  FaCircleUser,
  FaRegEnvelope,
  FaRegFloppyDisk,
  FaShieldHalved,
  FaXmark,
} from "react-icons/fa6";
import { GetUserById, updateUserById } from "@/services/GetUserService";

export default function MyProfile() {
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [usuario, setUsuario] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    senha: "",
    telefone: "",
    cargo: "",
    email: "",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    async function getUser() {
      const user = await GetUserById();
      setUsuario({ ...usuario, ...user, senha: "" });
    }
    getUser();
  }, []);

  const handleCadastro = async (e: FormEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    await updateUserById(usuario);
    alert("Usuário atualizado com sucesso.");
    setLoading(false);
  };

  const handleEmail = async (e: FormEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    await updateUserById({ email: usuario.email });
    alert("Usuário atualizado com sucesso.");
    setLoading(false);
  };

  const handleSenha = async (e: FormEvent) => {
    if (loading) return;
    e.preventDefault();
    setLoading(true);
    await updateUserById({ senha: usuario.senha });
    alert("Usuário atualizado com sucesso.");
    setLoading(false);
  };

  const handleCancelar = () => {
    setFoto(null);
    setUsuario({
      nome: "",
      sobrenome: "",
      cpf: "",
      telefone: "",
      cargo: "",
      email: "",
      senha: "",
    });
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
                <section className="flex flex-col w-[70%]">
                  <label htmlFor="">E-mail atual</label>
                  <input
                    className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                    type="email"
                    id="email"
                    name="email"
                    value={usuario.email}
                    style={{ width: "100%", height: "44px" }}
                    onChange={(e) =>
                      setUsuario({ ...usuario, email: e.target.value })
                    }
                  />
                </section>

                <button
                  onClick={handleEmail}
                  disabled={loading}
                  className="bg-amber-500 w-40 h-11 rounded-lg font-semibold text-white flex items-center justify-center gap-3 p-2"
                >
                  <FaRegEnvelope />
                  Alterar E-mail
                </button>
              </section>

              <section className="w-full flex justify-between items-center border-b-2 pb-3">
                <section className="flex flex-col w-[70%]">
                  <label htmlFor="">Senha atual</label>
                  <input
                    className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                    type="senha"
                    id="senha"
                    name="senha"
                    value={usuario.senha}
                    style={{ width: "100%", height: "44px" }}
                    onChange={(e) =>
                      setUsuario({ ...usuario, senha: e.target.value })
                    }
                  />
                </section>
                <button
                  onClick={handleSenha}
                  disabled={loading}
                  className="bg-amber-500 w-40 h-11 rounded-lg font-semibold text-white flex items-center justify-center gap-3 p-2"
                >
                  <FaShieldHalved />
                  Alterar Senha
                </button>
              </section>
            </section>

            <div className="flex flex-row gap-5  w-3 mt-5">
              <div>
                <label style={{ color: "#022D46" }} htmlFor="nome">
                  Nome:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="nome"
                  name="nome"
                  value={usuario.nome}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) =>
                    setUsuario({ ...usuario, nome: e.target.value })
                  }
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
                  value={usuario.sobrenome}
                  style={{ width: "820px", height: "44px" }}
                  onChange={(e) =>
                    setUsuario({ ...usuario, sobrenome: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-row w-3 gap-5">
              <div>
                <label style={{ color: "#022D46" }} htmlFor="cpf">
                  CPF:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={usuario.cpf}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) =>
                    setUsuario({ ...usuario, cpf: e.target.value })
                  }
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
                  value={usuario.telefone}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) =>
                    setUsuario({ ...usuario, telefone: e.target.value })
                  }
                />
              </div>

              <div>
                <label style={{ color: "#022D46" }} htmlFor="cargo">
                  Cargo:
                </label>
                <input
                  className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none pl-2"
                  type="text"
                  id="cargo"
                  name="cargo"
                  value={usuario.cargo}
                  style={{ width: "400px", height: "44px" }}
                  onChange={(e) =>
                    setUsuario({ ...usuario, cargo: e.target.value })
                  }
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
                disabled={loading}
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
                {loading ? (
                  <span className="loader" />
                ) : (
                  <>
                    {" "}
                    <FaArrowsRotate className="mr-5" /> Atualizar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
