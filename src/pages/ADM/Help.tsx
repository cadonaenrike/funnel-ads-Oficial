import NavBar from "@/components/navBar";
import { useRouter } from "next/router";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdHelpBuoy } from "react-icons/io";
import { useEffect, useState } from "react";
import { getAllHelps, deleteHelp } from "@/services/HelpService";
import { HelpType } from "@/types/HelpType";

export default function Help() {
  const router = useRouter();
  const [helps, setHelps] = useState<HelpType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const helpData = await getAllHelps();
        console.log(helpData);
        setHelps(helpData.map((item) => item.data)); // Ajuste para armazenar apenas os dados
      } catch (error) {
        console.error("Erro ao obter dados de ajuda:", error);
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    router.push("/ADM/ADMEditHelp");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteHelp(id);
      // Atualize os dados após a exclusão
      const updatedHelps = helps.filter((help) => help.id !== id);
      setHelps(updatedHelps);
      console.log("Ajuda excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir ajuda:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <IoMdHelpBuoy />
        <h1 className="font-semibold ml-2">Ajuda</h1>
      </section>
      <section className="bg-white max-w-screen-xl mx-auto justify-between items-center flex-col flex p-5">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-xl text-slate-800 ml-2">
            Relação de Tópicos
          </h2>
          <button
            onClick={handleClick}
            className="bg-amber-500 hover:bg-amber-500 px-12 py-2 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Tópico
          </button>
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2 w-full">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-5 py-3 w-auto font-bold">
                  ID
                </th>
                <th scope="col" className="px-5 py-3 w-auto font-bold">
                  Categoria
                </th>
                <th scope="col" className="px-10 py-3 w-auto font-bold">
                  Tópico
                </th>
                <th scope="col" className="px-10 py-3 w-auto font-bold">
                  Texto
                </th>
                <th scope="col" className=" px-10 py-3 w-auto font-bold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {helps.map((help, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {help.id} {/* Renderize o ID diretamente */}
                  </th>
                  <td className="px-5 py-2">{help.categorias.join(", ")}</td>
                  <td className="px-5 py-2">{help.topico}</td>
                  <td className="px-5 py-2">{help.descrição}</td>
                  <td className="flex items-center px-5 py-2">
                    <button
                      onClick={() =>
                        router.push(
                          `/ADM/ADMEditHelp?id=${
                            help.id
                          }&topico=${encodeURIComponent(
                            help.topico
                          )}&categorias=${help.categorias.join(
                            ","
                          )}&descricao=${encodeURIComponent(help.descrição)}`
                        )
                      }
                      type="button"
                      className="text-white m-5"
                    >
                      <img src="/icons/icon-edit-button.svg" />
                    </button>
                    <button
                      onClick={() => handleDelete(help.id)}
                      type="button"
                      className="text-white"
                    >
                      <img src="/icons/icon-delete-button.svg" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
