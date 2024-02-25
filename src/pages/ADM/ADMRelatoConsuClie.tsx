import NavBar from "@/components/navBar";
import { FaUsers } from "react-icons/fa6";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { useState } from "react";

export default function ADMRelatoConsClie() {
  const [date, setDate] = useState<Nullable<Date>>(null);
  const currentDate = new Date().toISOString().split("T")[0];
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
          {/* <div className="flex">
            <Calendar
              className="h-11 text-center placeholder:text-gray-400"
              pt={{}}
              value={date}
              onChange={(e) => setDate(e.value)}
              placeholder="Data de inicio"
            />
          </div> */}
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
            value={currentDate}
            className="h-11 w-25 bg-slate-50 rounded-lg p-2 "
          />
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Funil
                </th>
                <th scope="col" className="px-6 py-3">
                  Campanhas
                </th>
                <th scope="col" className="px-6 py-3">
                  Inicio
                </th>
                <th scope="col" className="px-6 py-3">
                  Leads
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Cloud</td>
                <td className="px-6 py-4">Novo</td>
                <td className="px-6 py-4">Novos Horizontes</td>
                <td className="px-6 py-4">25/11/2023</td>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">
                  <p className="bg-rose-50 rounded-md px-3 py-1 text-rose-600 ml-auto text-xs text-center border border-rose-600">
                    Pendente
                  </p>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Git</td>
                <td className="px-6 py-4">Novo</td>
                <td className="px-6 py-4">Novos Horizontes</td>
                <td className="px-6 py-4">25/11/2023</td>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">
                  <p className="bg-amber-50 rounded-md px-3 py-1 text-amber-500 ml-auto text-xs text-center border border-amber-500">
                    Em Aberto
                  </p>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">Meta</td>
                <td className="px-6 py-4">Novo</td>
                <td className="px-6 py-4">Novos Horizontes</td>
                <td className="px-6 py-4">25/11/2023</td>
                <td className="px-6 py-4">Enterprise</td>
                <td className="px-6 py-4">
                  <p className="bg-sky-50 rounded-md px-3 py-1 text-sky-600 ml-auto text-xs text-center border border-sky-600">
                    Pago
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
