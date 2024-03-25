import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { SubUser } from "@/types/SubUsersTypes";
import { getLastThreeClients } from "@/services/SubUsersService";
import { FaUser, FaXbox } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import Link from "next/link";
import { fetchAllUsers } from "@/services/GetUserService";
import { UserTypes } from "@/types/UserType";
import Button from "./button";

interface LastClientsCardProps {
  title: string;
}

const CardUsuarios: React.FC<LastClientsCardProps> = ({ title }) => {
  const [usuarios, setUsuarios] = useState<UserTypes[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setUsuarios(users || []);
      } catch (error) {
        console.error("Erro ao obter os últimos clientes:", error);
      }
    };

    fetchUsers();
  }, []);



  return (
    <div className="flex flex-col items-center rounded-md bg-white w-[650px] text-slate-800 p-10 shadow-lg relative">
      <div className="flex justify-between w-full items-center">
        <div>
          <h2 className="text-lg">Meus usuários</h2>
        </div>
        <div>
          <Link href={"/ADM/CadNewUser"}>
            <button
              className={`flex justify-center gap-2 items-center text-white px-6 bg-[#fb8500] p-3 rounded hover:bg-[#e67c02] w-64`}
            >
              <IoMdAddCircle className="text-xl" /> Usuário
            </button>
          </Link>
        </div>
      </div>

      <div className="overflow-hidden shadow-md sm:rounded-lg w-full mt-5">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-sm font-bold text-gray-900 py-4 text-left ps-5">
                Foto
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Nome
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                Nível de Acesso
              </th>
              <th
                scope="col"
                className="text-sm font-bold text-gray-900 px-6 py-4 text-left"
              >
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}
              >
                <td className="ps-5 py-3 !w-[10px] whitespace-nowrap text-sm font-medium text-gray-900"></td>
                <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                  {item.nome}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                  {item.cargo}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-3 whitespace-nowrap">
                  {item.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardUsuarios;
