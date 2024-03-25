import React, { useState, useEffect, useRef, Fragment } from "react";
import NavBar from "@/components/navBar";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaCirclePlus,
  FaFlagCheckered,
  FaFolderOpen,
  FaRegFolderOpen,
  FaRegPenToSquare,
  FaRegTrashCan,
} from "react-icons/fa6";
import { useRouter } from "next/router";
import { getPastaById } from "@/services/PastaService";
import {
  addCampanhaToPasta,
  deleteCampanha,
  getCampanhasById,
} from "@/services/CampanhaService";
import { Pasta, Campanha } from "@/types/PasteTypes";

export default function AddPaste() {
  const router = useRouter();
  const [showCampanhas, setShowCampanhas] = useState<number | null>(null);
  const [pasta, setPasta] = useState<Pasta | null>(null);
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [novaCampanhaNome, setNovaCampanhaNome] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const pastaId = sessionStorage.getItem("pasta_id");
    if (!pastaId) {
      console.error("ID da pasta não encontrado no sessionStorage.");
      return;
    }

    const fetchPastaECampanhas = async () => {
      try {
        const fetchedPasta = await getPastaById(pastaId);
        const fetchedCampanhas = await getCampanhasById(pastaId);
        setPasta(fetchedPasta);
        setCampanhas(fetchedCampanhas);
      } catch (error) {
        console.error("Erro ao carregar pasta e campanhas", error);
      }
    };

    fetchPastaECampanhas();
  }, []);

  const handlePastaClick = (pastaIndex: number) => {
    setShowCampanhas((prev) => (prev === pastaIndex ? null : pastaIndex));
  };

  const handleSaveCampanha = async (e: React.FormEvent) => {
    e.preventDefault();
    const pastaId = sessionStorage.getItem("pasta_id");
    if (!pastaId || !novaCampanhaNome.trim()) return;
    const useridcapturado = sessionStorage.getItem("idUser");
    if (!useridcapturado) {
      alert("Não possui usuário logado");
      router.push("/Login");
      return;
    }
    await addCampanhaToPasta(pastaId, {
      name: novaCampanhaNome,
      userid: useridcapturado,
      funis: [],
    });
    const updatedCampanhas = await getCampanhasById(pastaId);
    setCampanhas(updatedCampanhas);
    setNovaCampanhaNome("");
    setShowModal(false);
  };

  const editCampanha = () => {
    router.push("/CLIENTE/Campanha-Client");
  };

  const handleDeleteClick = async (campanhaId: string) => {
    await deleteCampanha(campanhaId);
    window.location.reload();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNovaCampanhaNome("");
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaFolderOpen />
        <h1 className="font-semibold text-2xl ml-2">Pasta: {pasta?.name}</h1>
      </section>

      <div className="flex justify-end px-28 mr-52 ">
        <button
          onClick={() => setShowModal(true)}
          className="bg-amber-500 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
        >
          <FaCirclePlus /> Adicionar Campanha
        </button>
      </div>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex-col flex p-5 rounded-lg shadow-lg">
        {campanhas.map((campanha, index) => (
          <section
            key={index}
            className="bg-white w-full border-b-2 mx-auto flex justify-between items-center"
          >
            <div>
              <h2
                className="flex gap-3 items-center cursor-pointer"
                onClick={() => handlePastaClick(index)}
              >
                {" "}
                {showCampanhas === index ? (
                  <FaFolderOpen />
                ) : (
                  <FaRegFolderOpen />
                )}{" "}
                {campanha.name} ({campanha.funis ? campanha.funis.length : 0}{" "}
                funis)
              </h2>
              {showCampanhas === index &&
                campanha.funis &&
                campanha.funis.length > 0 && (
                  <ul>
                    {campanha.funis.map((funis, funisIndex) => (
                      <li
                        className="ml-6 mt-6 flex items-center gap-2"
                        key={funisIndex}
                      >
                        <FaFlagCheckered /> {funis.name} {`0 funis`}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <div className="flex items-center px-5 py-1">
              <button
                type="button"
                onClick={() => editCampanha()}
                className="text-black m-5"
              >
                <FaRegPenToSquare />
              </button>
              <button
                type="button"
                onClick={() => handleDeleteClick(campanha.id)}
                className="text-black m-5"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </section>
        ))}
      </section>

      <Transition.Root show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleModalClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg">
                  <form onSubmit={handleSaveCampanha} className="bg-white">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-end">
                        <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                          >
                            Adicionar Campanha para Pasta {pasta?.name}
                          </Dialog.Title>
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Nome da Campanha"
                              value={novaCampanhaNome}
                              onChange={(e) =>
                                setNovaCampanhaNome(e.target.value)
                              }
                              className="border mt-2 p-2 w-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        onClick={handleModalClose}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
