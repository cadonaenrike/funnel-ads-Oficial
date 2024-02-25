/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function CustomerRelationship() {
  return (
    <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5">
      <h1 className="font-semibold text-2xl ml-2">Relação de Clientes</h1>
      <div
        style={{ display: "flex", marginTop: "10px", justifyContent: "end" }}
      >
        <input
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
          <option value="" disabled selected>
            Buscar por plano
          </option>
          <option value="opcao1">Opção 1</option>
          <option value="opcao2">Opção 2</option>
          <option value="opcao3">Opção 3</option>
        </select>

        <select
          style={{
            padding: "5px",
            marginBottom: "15px",
            width: "220px",
            height: "44px",
          }}
          id="selectOpcao2"
          name="selectOpcao2"
        >
          <option value="" disabled selected>
            Buscar por status
          </option>
          <option value="opcao1">Opção 1</option>
          <option value="opcao2">Opção 2</option>
          <option value="opcao3">Opção 3</option>
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
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Região Sudeste
              </th>

              <td className="px-6 py-4">Pasta 0001</td>
              <td className="px-6 py-4">Pasta 0001</td>
              <td className="px-6 py-4">Pasta 0001</td>
              <td className="px-6 py-4">Pasta 0001</td>
              <td className="px-6 py-4">Pasta 0001</td>
              <td className="px-6 py-4">
                <div style={{ display: "flex" }}>
                  <img src="/icons/icon.eye.svg" alt="" />
                  <img
                    style={{ paddingLeft: "10px" }}
                    src="/icons/icon.chart.svg"
                    alt=""
                  />
                </div>
                {}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
