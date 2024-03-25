import NavBar from "@/components/navBar";
import { deleteSubUser, getSubUsers } from "@/services/SubUsersService";
import { SubUser } from "@/types/SubUsersTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaCamera,
  FaCirclePlus,
  FaCircleUser,
  FaRegPenToSquare,
  FaTrash,
  FaUserGraduate,
} from "react-icons/fa6";

export default function ADMUserList() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<SubUser[]>([]);
  useEffect(() => {
    const fetchUsuarios = async () => {
      const data = await getSubUsers();
      if (data) {
        setUsuarios(data);
      }
    };

    fetchUsuarios();
  }, []);

  const handleClick = () => {
    router.push("/CLIENTE/CadNewUser-Client");
  };
  const handleEdit = (subUserId: string) => {
    // Redireciona para a página de edição com o ID do subUser
    router.push(`/CLIENTE/CadNewUser-Client/?subUserId=${subUserId}`);
  };
  const handleDelete = async (subUserId: string) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este usuário?"
    );
    if (confirmDelete) {
      const success = await deleteSubUser(subUserId);
      if (success) {
        // Atualizar a lista de usuários após a exclusão bem-sucedida
        const updatedUsuarios = usuarios.filter(
          (usuario) => usuario.id !== subUserId
        );
        setUsuarios(updatedUsuarios);
      } else {
        alert("Falha ao excluir o usuário.");
      }
    }
  };
  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl flex-col mx-auto px-4">
        <section className="flex max-w-screen-xl px-4 text-sky-950 text-4xl mt-10 mb-5">
          <FaCircleUser />
          <h1 className="ml-2 font-semibold">Usuários</h1>
        </section>
        <section className="flex flex-col border rounded-lg shadow-lg bg-gray-100 max-w-screen-xl mx-4 h-auto p-4 mb-4">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-xl text-slate-800 ml-2">
              Relação de Usuários
            </h2>
            <button
              onClick={handleClick}
              className="bg-amber-500 h-11 px-12 py-2 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
            >
              <FaCirclePlus /> Usuarios
            </button>
          </div>
          <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    <FaCamera size="20" />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    E-mail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Celular
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nível de Acesso
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Cargo
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">
                      <FaUserGraduate className="text-xl" />
                    </td>
                    <td className="px-6 py-4">
                      {usuario.nome} {usuario.sobrenome}
                    </td>
                    <td className="px-6 py-4">{usuario.email}</td>
                    <td className="px-6 py-4">{usuario.celular}</td>
                    <td className="px-6 py-4">{usuario.nivelAcesso}</td>
                    <td className="px-6 py-4">{usuario.cargo}</td>
                    <td className="px-6 py-4">
                      <div style={{ display: "flex" }}>
                        <FaRegPenToSquare
                          className="text-lg text-sky-900 cursor-pointer mr-2"
                          onClick={() => handleEdit(usuario.id)}
                        />
                        <FaTrash
                          className="text-lg text-sky-900 cursor-pointer"
                          onClick={() => handleDelete(usuario.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </>
  );
}
