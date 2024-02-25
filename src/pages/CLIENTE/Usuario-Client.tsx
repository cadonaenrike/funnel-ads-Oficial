import NavBar from "@/components/navBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  FaCamera,
  FaCirclePlus,
  FaCircleUser,
  FaRegPenToSquare,
  FaRegTrashCan,
  FaUserGraduate,
} from "react-icons/fa6";

interface Usuario {
  userid: number;
  nome: string;
  sobrenome: string;
  email: string;
  isadmin: boolean;
}

export default function ADMUserList() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("https://serve-qm5b.vercel.app/usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao recuperar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);
  const handleClick = () => {
    router.push("/CadNewUser-Client");
  };
  return (
    <>
      {" "}
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaCircleUser />
        <h1 className="ml-2 font-semibold">Usuários</h1>
      </section>
      <section className="flex flex-col border rounded-lg shadow-lg bg-gray-100 max-w-screen-xl mx-auto h-auto p-4 mb-4">
        <div className="flex items-center justify-between w-full">
          <h2 className="font-semibold text-xl text-slate-800 ml-2">
            Relação de Usuários
          </h2>
          <button
            onClick={handleClick}
            className="bg-amber-500 h-11 px-12 py-2 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Usuário
          </button>
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="pl-6 py-3">
                  <FaCamera size="20" />
                </th>
                <th scope="col" className="py-3">
                  Nome
                </th>
                <th scope="col" className="px-6 py-3">
                  Celular
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Nível de Acesso
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="pl-6 py-4">
                  <FaUserGraduate className="text-xl" />
                </td>
                <td className="py-4">Pedro</td>
                <td className="px-6 py-4">(22) 9992-9229</td>
                <td className="px-6 py-4">pedro@pedro.com</td>

                <td className="px-6 py-4">Operador</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaRegPenToSquare className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaRegTrashCan className="text-lg text-sky-900 cursor-pointer" />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <FaUserGraduate className="text-xl" />
                </td>
                <td className="py-4">Paulo</td>
                <td className="px-6 py-4">(00) 9992-9000</td>
                <td className="px-6 py-4">paulo@paulo.com</td>

                <td className="px-6 py-4">Gerente</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaRegPenToSquare className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaRegTrashCan className="text-lg text-sky-900 cursor-pointer" />
                  </div>
                </td>
              </tr>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">
                  <FaUserGraduate className="text-xl" />
                </td>
                <td className="py-4">Paola</td>
                <td className="px-6 py-4">(00) 92292-9000</td>
                <td className="px-6 py-4">paola@paola.com</td>

                <td className="px-6 py-4">Financeiro</td>
                <td className="px-6 py-4">
                  <div style={{ display: "flex" }}>
                    <FaRegPenToSquare className="text-lg text-sky-900 cursor-pointer mr-2" />
                    <FaRegTrashCan className="text-lg text-sky-900 cursor-pointer" />
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
