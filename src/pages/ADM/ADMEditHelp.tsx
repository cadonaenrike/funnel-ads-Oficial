import EditorTexto from "@/components/editorTexto";
import AddCategoriaModal from "@/components/AddCategoriaModal";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { useEffect, useState } from "react";
import {
  FaArrowsRotate,
  FaCirclePlus,
  FaRegFloppyDisk,
  FaXmark,
} from "react-icons/fa6";
import { IoMdHelpBuoy } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/router";
import { addHelp, updateHelp } from "@/services/HelpService";

export default function ADMEditHelp() {
  const router = useRouter();
  const id = router.query.id as string;

  interface HelpForm {
    categorias: string[];
    topico: string;
    descrição: string;
  }

  const [openModal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [requiredTopico, setRequiredTopico] = useState(false);
  const [form, setForm] = useState<HelpForm>({
    categorias: router.query.categorias
      ? (router.query.categorias as string).split(",")
      : [],
    topico: (router.query.topico as string) || "",
    descrição: (router.query.descricao as string) || "",
  });

  useEffect(() => {
    if (router.isReady) {
      setForm({
        categorias: router.query.categorias
          ? (router.query.categorias as string).split(",")
          : [],
        topico: (router.query.topico as string) || "",
        descrição: (router.query.descricao as string) || "",
      });
    }
  }, [router.isReady, router.query]);

  const addCategoria = (name: string) => {
    setForm({
      ...form,
      categorias: [...form.categorias, name],
    });
  };

  const removeCategoria = (name: string) => {
    const remove = form.categorias.filter((c) => c !== name);
    setForm({
      ...form,
      categorias: remove,
    });
  };

  const handleAddHelp = async () => {
    if (!form.topico) {
      setRequiredTopico(true);
      return;
    }

    setLoading(true);

    !router.query.id
      ? await addHelp(form)
      : await updateHelp(id, form.categorias, form.topico, form.descrição);

    router.push("/ADM/Help");
  };

  const handleOpenModal = () => {
    setModal(true);
  };
  const handleCLoseModal = () => {
    setModal(false);
  };

  const CategoriaItem = ({ name }: { name: string }) => {
    return (
      <div className="flex items-center gap-1 border rounded-lg px-2 bg-white border-slate-800">
        <span
          onClick={() => removeCategoria(name)}
          className="text-slate-800 cursor-pointer"
        >
          <MdCancel />{" "}
        </span>{" "}
        {name}
      </div>
    );
  };

  useAdminCheck();
  return (
    <>
      <NavBar />
      <AddCategoriaModal
        onOk={addCategoria}
        isOpen={openModal}
        isClose={handleCLoseModal}
      />

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
            <div className="rounded-lg h-12 bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2 flex gap-2">
              {form.categorias.map((c) => (
                <CategoriaItem key={c} name={c} />
              ))}
            </div>
          </section>
          <button
            onClick={handleOpenModal}
            className="bg-amber-500 h-12 mt-8 hover:bg-amber-500 px-3 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Categoria:
          </button>
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="valor" className="text-gray-500">
              Tópico:
            </label>
            <input
              value={form.topico}
              onChange={(e) => setForm({ ...form, topico: e.target.value })}
              type="text"
              name="valor"
              placeholder="Ex: Criando Funil"
              className={`rounded-lg h-12 bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2 ${
                requiredTopico ? "border-2 border-red-500" : ""
              }`}
            />
          </section>
        </section>

        <section className="mt-3 flex flex-col gap-3 pb-10">
          <h2 className="text-gray-500 font-bold">Descrição:</h2>
          <EditorTexto
            value={form.descrição}
            setValue={(v) => setForm({ ...form, descrição: v })}
            placeholder={"Typings"}
          />
        </section>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => router.push("/ADM/Help")}
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
            className="hover:bg-cyan-600 font-semibold text-white bg-cyan-950"
            onClick={handleAddHelp}
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
                {router.query.id ? (
                  <>
                    <FaArrowsRotate className="mr-5" /> Atualizar{" "}
                  </>
                ) : (
                  <>
                    <FaRegFloppyDisk className="mr-5" /> Salvar{" "}
                  </>
                )}
              </>
            )}
          </button>

          {/* <button
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
          </button> */}
        </div>
      </section>
    </>
  );
}
