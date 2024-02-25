import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import {
  FaChartSimple,
  FaEye,
  FaFacebook,
  FaGithub,
  FaPhotoFilm,
  FaUsers,
  FaXbox,
} from "react-icons/fa6";

export default function RelatoClient() {
  useAdminCheck();
  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Clientes</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5">
        <h1 className="font-semibold text-2xl ml-2">Relação de Clientes</h1>
        <div
          style={{ display: "flex", marginTop: "10px", justifyContent: "end" }}
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
            className="rounded-lg bg-slate-50"
            style={{
              padding: "5px",
              marginBottom: "15px",
              marginRight: "15px",
              width: "220px",
              height: "44px",
            }}
            id="selectOpcao1"
            name="selectOpcao1"
          >
            <option value="" selected className="text-slate-300"></option>
            <option value="opcao1">Starter</option>
            <option value="opcao2">Professional</option>
            <option value="opcao3">Enterprise</option>
          </select>

          <select
            className="rounded-lg bg-slate-50"
            style={{
              padding: "5px",
              marginBottom: "15px",
              width: "220px",
              height: "44px",
            }}
            id="selectOpcao2"
            name="selectOpcao2"
          >
            <option value="" selected></option>
            <option value="opcao1">Ativo</option>
            <option value="opcao2">Inativo</option>
          </select>
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <FaPhotoFilm />
                </th>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Contato
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Plano
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
                <td className="px-6 py-4">
                  <FaXbox className="text-xl" />
                </td>
                <td className="px-6 py-4">Cloud</td>
                <td className="px-6 py-4">Paulo</td>
                <td className="px-6 py-4">(99) 9999-9999</td>
                <td className="px-6 py-4">cloud@microsoft.com</td>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">Ativo</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaEye className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaChartSimple className="text-lg text-sky-900 cursor-pointer" />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <FaGithub className="text-xl" />
                </td>
                <td className="px-6 py-4">Git</td>
                <td className="px-6 py-4">Pedro</td>
                <td className="px-6 py-4"> - </td>
                <td className="px-6 py-4">git@github.com</td>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">Ativo</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaEye className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaChartSimple className="text-lg text-sky-900 cursor-pointer" />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <FaFacebook className="text-xl" />
                </td>
                <td className="px-6 py-4">Meta</td>
                <td className="px-6 py-4">João</td>
                <td className="px-6 py-4">(22) 9992-9229</td>
                <td className="px-6 py-4">facebook@meta.com</td>
                <td className="px-6 py-4">Professional</td>
                <td className="px-6 py-4">Inativo</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaEye className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaChartSimple className="text-lg text-sky-900 cursor-pointer" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
