/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { useRouter } from "next/router";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdHelpBuoy } from "react-icons/io";

export default function Help() {
  const router = useRouter();
  useAdminCheck();
  const handleClick = () => {
    router.push("/ADMEditHelp");
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
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  673213
                </th>

                <td className="px-5 py-2">Funil</td>
                <td className="px-5 py-2">Como criar Funil123</td>
                <td className="px-5 py-2">Aqui vai texto de ajuda</td>
                <td className="flex items-center px-5 py-2">
                  <button type="button" className="text-white m-5">
                    <img src="/icons/icon-edit-button.svg" />
                  </button>
                  <button type="button" className="text-white">
                    <img src="/icons/icon-delete-button.svg" />
                  </button>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  021987
                </th>

                <td className="px-5 py-2">Funil</td>
                <td className="px-5 py-2">Como criar Funil</td>
                <td className="px-5 py-2">Aqui vai texto de ajuda</td>
                <td className="flex items-center px-5 py-2">
                  <button type="button" className="text-white m-5">
                    <img src="/icons/icon-edit-button.svg" />
                  </button>
                  <button type="button" className="text-white">
                    <img src="/icons/icon-delete-button.svg" />
                  </button>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  695647
                </th>

                <td className="px-5 py-2">Gatilhos</td>
                <td className="px-5 py-2">Como criar Gatilho com TIMER</td>
                <td className="px-5 py-2">Aqui va ajuda </td>
                <td className="flex items-center px-5 py-2">
                  <button type="button" className="text-white m-5">
                    <img src="/icons/icon-edit-button.svg" />
                  </button>
                  <button type="button" className="text-white">
                    <img src="/icons/icon-delete-button.svg" />
                  </button>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-5 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  472007
                </th>

                <td className="px-5 py-2">Funções, Gatilhos</td>
                <td className="px-5 py-2">
                  Como criar Função com Disparo de SMS
                </td>
                <td className="px-5 py-2">
                  Aqui vai a ajuda do disparo de SMS
                </td>
                <td className="flex items-center px-5 py-2">
                  <button type="button" className="text-white m-5">
                    <img src="/icons/icon-edit-button.svg" />
                  </button>
                  <button type="button" className="text-white">
                    <img src="/icons/icon-delete-button.svg" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
