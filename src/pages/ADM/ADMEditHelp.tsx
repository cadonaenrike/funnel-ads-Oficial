import EditorTexto from "@/components/editorTexto";
import Modal from "@/components/modal";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { useState } from "react";
import {
  FaArrowsRotate,
  FaCirclePlus,
  FaRegFloppyDisk,
  FaXmark,
} from "react-icons/fa6";
import { IoMdHelpBuoy } from "react-icons/io";

export default function ADMEditHelp() {
  const [openModal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCLoseModal = () => {
    setModal(false);
  };
  useAdminCheck();
  return (
    <>
      <NavBar />
      <Modal isOpen={openModal} isClose={handleCLoseModal} />

      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <IoMdHelpBuoy />
        <h1 className="ml-2 font-semibold">Ajuda</h1>
      </section>
      <section className=" bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg shadow-xl">
        <h1 className="font-semibold text-2xl  text-slate-800">
          Cadastro de Ajuda
        </h1>

        <section className="flex w-full flex-row gap-5 mt-3">
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="nomePlano" className="text-gray-500">
              Categoria:
            </label>
            <input
              type="text"
              name="nomePlano"
              placeholder="Ex: Funil"
              className="rounded-lg h-12 bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2"
            />
          </section>
          <button
            onClick={handleOpenModal}
            className="bg-amber-500 h-12 mt-8 hover:bg-amber-500 px-3 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Categoria
          </button>
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="valor" className="text-gray-500">
              Topico
            </label>
            <input
              type="text"
              name="valor"
              placeholder="Ex: Criando Funil"
              className="rounded-lg h-12 bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2"
            />
          </section>
        </section>

        <section className="mt-3 flex flex-col gap-3 pb-10">
          <h2 className="text-gray-500 font-bold">Descrição do plano</h2>
          <EditorTexto placeholder={"Typings"} />
        </section>
        <div className="flex justify-end mt-4">
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
            <FaRegFloppyDisk className="mr-5" />
            Salvar
          </button>

          <button
            className="hover:bg-cyan-600 font-semibold text-white bg-cyan-950"
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
            <FaArrowsRotate className="mr-5" />
            Atualizar
          </button>
        </div>
      </section>
    </>
  );
}
