import EditorTexto from "@/components/editorTexto";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { FaRegFloppyDisk, FaRegStar, FaXmark } from "react-icons/fa6";

export default function EditarPlano() {
  useAdminCheck();
  return (
    <>
      <NavBar />

      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaRegStar />
        <h1 className="ml-2 font-semibold">Planos</h1>
      </section>
      <section className=" bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg shadow-xl">
        <h1 className="font-semibold text-2xl  text-slate-800">Editar Plano</h1>

        <section className="flex w-full flex-row gap-5 mt-3">
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="nomePlano" className="text-gray-500">
              Nome do Plano:
            </label>
            <input
              type="text"
              name="nomePlano"
              placeholder="Ex: Starter"
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2"
            />
          </section>
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="valor" className="text-gray-500">
              Valor:
            </label>
            <input
              type="text"
              name="valor"
              placeholder="0,00"
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2"
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
        </div>
      </section>
    </>
  );
}
