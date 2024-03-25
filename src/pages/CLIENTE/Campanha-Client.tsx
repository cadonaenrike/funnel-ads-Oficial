import React, { useState, useEffect } from "react";
import NavBar from "@/components/navBar";
import { FaFloppyDisk } from "react-icons/fa6";
import { IoFlagSharp } from "react-icons/io5";
import { Campanha } from "@/types/PasteTypes";
import {
  deleteCampanha,
  getCampanhas,
  getCampanhasById,
  getCampanhasIdUser,
  updateCampanha,
} from "@/services/CampanhaService";
import { useRouter } from "next/router";

export default function AddCampanha() {
  const [nomeCampanha, setNomeCampanha] = useState("");
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [editCampanhaId, setEditCampanhaId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const useridcapturado = sessionStorage.getItem("idUser");
    if (!useridcapturado) {
      alert("Não possui usuário logado");
      router.push("/Login");
      return;
    }
    const fetchCampanhas = async () => {
      const fetchedCampanhas = await getCampanhasIdUser(useridcapturado);
      setCampanhas(fetchedCampanhas);
    };

    fetchCampanhas();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const useridcapturado = sessionStorage.getItem("idUser");
    if (!useridcapturado) {
      alert("Não possui usuário logado");
      router.push("/Login");
      return;
    }
    // Atualiza a campanha existente
    if (editCampanhaId) {
      await updateCampanha(editCampanhaId, {
        name: nomeCampanha,
        userid: useridcapturado,
      });

      setNomeCampanha("");
      setEditCampanhaId(null);
      const fetchedCampanhas = await getCampanhasIdUser(useridcapturado);
      setCampanhas(fetchedCampanhas);
    }
  };

  const handleEditClick = (campanhaId: string, name: string) => {
    setNomeCampanha(name);
    setEditCampanhaId(campanhaId);
  };

  const handleDeleteClick = async (campanhaId: string) => {
    await deleteCampanha(campanhaId);
    const fetchedCampanhas = await getCampanhas();
    setCampanhas(fetchedCampanhas);
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <IoFlagSharp />
        <h1 className="font-semibold text-2xl ml-2">Campanhas</h1>
      </section>
      <section className="bg-white max-w-screen-xl mx-auto flex flex-col p-5 rounded-lg">
        <label htmlFor="nomeCampanha">Nome da Campanha</label>
        <form onSubmit={handleFormSubmit} className="flex justify-between">
          <input
            id="nomeCampanha"
            value={nomeCampanha}
            onChange={(e) => setNomeCampanha(e.target.value)}
            className="bg-slate-100 w-full mr-8 p-5 h-11 rounded-lg outline-none"
            type="text"
          />
          <button
            disabled={!editCampanhaId} // Desabilita o botão se não houver campanha selecionada
            className="bg-amber-500 hover:bg-amber-600 px-10 gap-2 rounded-md text-white flex items-center disabled:bg-neutral-400"
          >
            <FaFloppyDisk />
            <b>Salvar</b>
          </button>
        </form>
      </section>
      <section className="bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg">
        <h1 className="font-semibold text-2xl ml-2">Relação de Campanhas</h1>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-5 py-2 w-3/5 font-extrabold">
                  Campanha
                </th>
                <th scope="col" className="px-5 py-2 w-3/12 font-extrabold">
                  Pasta
                </th>
                <th scope="col" className="px-10 py-2 w-auto font-extrabold">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {campanhas.map((campanha) => (
                <tr key={campanha.id} className="border-b">
                  <td className="px-5 py-4 whitespace-nowrap">
                    {campanha.name}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    Pasta {campanha.pasta_id}
                  </td>
                  <td className="flex items-center justify-center px-5 py-4 space-x-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleEditClick(campanha.id, campanha.name)
                      }
                      className="text-white m-5"
                    >
                      <img src="/icons/icon-edit-button.svg" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteClick(campanha.id)}
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
