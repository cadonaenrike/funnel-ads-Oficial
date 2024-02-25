import NavBar from "@/components/navBar";
import { FaPaperPlane, FaRegPaperPlane, FaUsers } from "react-icons/fa6";

export default function ADMRelatoFaturamento() {
  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Clientes</h1>
      </section>

      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <h1 className="font-semibold text-2xl ml-2">
          Relação de Campanhas de Clientes
        </h1>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "start",
          }}
        >
          <input
            className="rounded-lg bg-slate-50 px-2"
            style={{
              marginRight: "15px",
              marginBottom: "15px",
              width: "330px",
              height: "44px",
            }}
            type="text"
            placeholder="Buscar por cliente"
          />

          <select
            required
            name="buscarPlano"
            id=""
            className="h-11 w-48 bg-slate-50 rounded-lg p-2 mr-4 invalid:text-neutral-500"
          >
            <option
              value=""
              className="checked:text-neutral-500"
              selected
              disabled
            >
              Buscar por Plano
            </option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
          <input
            type="date"
            name=""
            id=""
            className="h-11 w-25 bg-slate-50 rounded-lg p-2 mr-4"
          />
          <input
            type="date"
            name=""
            id=""
            className="h-11 w-25 bg-slate-50 rounded-lg p-2"
          />
          <select
            required
            name="buscarStatus"
            id=""
            className="h-11 w-48 bg-slate-50 rounded-lg p-2 ml-4 invalid:text-neutral-500"
            placeholder="Buscar por Status"
          >
            <option
              value=""
              className="checked:text-neutral-500"
              selected
              disabled
            >
              Buscar por Status
            </option>
            <option value="starter">Quitado</option>
            <option value="professional">Pendente</option>
            <option value="Enterprise">Em Aberto</option>
          </select>
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Contato
                </th>
                <th scope="col" className="px-6 py-3">
                  Plano
                </th>
                <th scope="col" className="px-6 py-3">
                  Periodo
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Vencimento
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Cloud</td>
                <td className="px-6 py-4">Pedro</td>
                <td className="px-6 py-4">Professional</td>
                <td className="px-6 py-4">
                  <p className="bg-cyan-50 rounded-md px-3 py-1 text-cyan-600 ml-auto text-xs text-center border border-cyan-600">
                    Mensal
                  </p>
                </td>
                <td className="px-6 py-4">R$ 299,99</td>
                <td className="px-6 py-4">25/11/2023</td>
                <td className="px-6 py-4">
                  <p className="bg-amber-50 rounded-md px-3 py-1 text-amber-500 ml-auto text-xs text-center border border-amber-500">
                    Em Aberto
                  </p>
                </td>
                <td className="px-6 py-4">
                  <FaRegPaperPlane className="text-center text-xl ml-4 text-sky-900" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
