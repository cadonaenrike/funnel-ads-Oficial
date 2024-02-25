import { useRouter } from "next/router";
import { FaChartSimple, FaCirclePlus, FaEye, FaRegStar } from "react-icons/fa6";

export default function CadPlanos() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/EditarPlano");
  };
  return (
    <>
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaRegStar />
        <h1 className="ml-2">Planos</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5">
        <section className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl ml-2 text-slate-800">
            Planos de serviços
          </h1>
          <button
            onClick={handleClick}
            className="bg-amber-500 px-12 py-2 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Plano
          </button>
        </section>

        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Descrição
                </th>
                <th scope="col" className="w-96"></th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Starter</td>
                <td className="px-6 py-4">R$ 199,90</td>
                <td className="px-6 py-4">
                  <ul style={{ listStyle: "outside" }}>
                    <li>Outra descrição</li>
                    <li>Mais uma descrição</li>
                    <li>Outra</li>
                  </ul>
                </td>
                <td></td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-lg text-gray-700">
                    <FaEye className="hover:cursor-pointer" />
                    <FaChartSimple className="hover:cursor-pointer" />
                  </div>
                  {}
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Professional</td>
                <td className="px-6 py-4">R$ 299,90</td>
                <td className="px-6 py-4">
                  <ol className="list-decimal">
                    <li>Outra descrição</li>
                    <li>Mais uma descrição</li>
                    <li>Outra</li>
                  </ol>
                </td>
                <td></td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-lg text-gray-700">
                    <FaEye className="hover:cursor-pointer" />
                    <FaChartSimple className="hover:cursor-pointer" />
                  </div>
                  {}
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">R$ 499,90</td>
                <td className="px-6 py-4">Uma descrição para o plano</td>
                <td></td>
                <td className="px-6 py-4">
                  <div className="flex gap-4 text-lg text-gray-700">
                    <FaEye className="hover:cursor-pointer" />
                    <FaChartSimple className="hover:cursor-pointer" />
                  </div>
                  {}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
