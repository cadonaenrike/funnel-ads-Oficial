import { useEffect, useState } from "react";
import {
  FaCirclePlus,
  FaFlagCheckered,
  FaFolderOpen,
  FaRegFolderOpen,
  FaRegPenToSquare,
  FaRegTrashCan,
} from "react-icons/fa6";
import NavBar from "@/components/navBar";
import { addPasta, getAllPastas, deletePasta } from "@/services/PastaService";
import { getCampanhasById } from "@/services/CampanhaService"; // Importe o método getCampanhasById
import { Pasta, Campanha, Funil } from "@/types/PasteTypes";
import { useRouter } from "next/router";

export default function AddPaste() {
  const [pastas, setPastas] = useState<Pasta[]>([]);
  const [novaPastaNome, setNovaPastaNome] = useState<string>("");
  const [pastaError, setPastaError] = useState(false);
  const [showCampanhas, setShowCampanhas] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadPastasFromLocalStorage = async () => {
      try {
        const pastasFromAPI = await getAllPastas();
        // Para cada pasta, buscar as campanhas e atualizar a pasta com o número de campanhas
        const pastasWithCampanhas = await Promise.all(
          pastasFromAPI.map(async (pasta) => {
            const campanhas = await getCampanhasById(pasta.id);
            return { ...pasta, campanhas };
          })
        );
        setPastas(pastasWithCampanhas);
      } catch (error) {
        console.error("Erro ao carregar pastas:", error);
      }
    };

    loadPastasFromLocalStorage();
  }, []);

  const saveFormButton = async (e: React.FormEvent) => {
    e.preventDefault();

    setPastaError(false);
    const novaPasta: Pasta = {
      id: "your_generated_id_here", // Gerar um ID adequado ou ajustar conforme sua lógica
      name: novaPastaNome,
      campanhas: [],
    };

    try {
      const novaPastaAdicionada = await addPasta(novaPasta);
      setPastas((prevPastas) => [...prevPastas, novaPastaAdicionada]);
      setNovaPastaNome("");
    } catch (error) {
      console.error("Erro ao adicionar pasta:", error);
    }
  };

  const createCampanha = (pastaIndex: number) => {
    const selectedPasta = pastas[pastaIndex];
    if (selectedPasta) {
      sessionStorage.setItem("pasta_id", selectedPasta.id);
      router.push("/CLIENTE/RelacaoDeCampanha-Client");
    }
  };

  const handlePastaClick = (pastaIndex: number) => {
    setShowCampanhas((prev) => (prev === pastaIndex ? null : pastaIndex));
  };

  const handleDeletePasta = async (pastaId: string) => {
    try {
      await deletePasta(pastaId);
      const updatedPastas = pastas.filter((pasta) => pasta.id !== pastaId);
      setPastas(updatedPastas);
    } catch (error) {
      console.error("Erro ao excluir pasta:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaFolderOpen />
        <h1 className="font-semibold text-2xl ml-2">Pasta</h1>
      </section>
      <section className="bg-white max-w-screen-xl mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <label>Nome da Pasta</label>
        <form onSubmit={saveFormButton} className="flex justify-between">
          <input
            required
            value={novaPastaNome}
            onChange={(e) => setNovaPastaNome(e.target.value)}
            className={`bg-slate-100 w-full mr-8 px-4 rounded-lg outline-none ${
              pastaError ? "border-red-600" : "border-none"
            }`}
            type="text"
          />
          <button
            type="submit"
            className="bg-amber-500 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Pasta...
          </button>
        </form>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex-col flex p-5 rounded-lg shadow-lg">
        {pastas.map((pasta, index) => (
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
                {pasta.name} ({pasta.campanhas ? pasta.campanhas.length : 0}{" "}
                campanhas)
              </h2>
              {showCampanhas === index &&
                pasta.campanhas &&
                pasta.campanhas.length > 0 && (
                  <ul>
                    {pasta.campanhas.map((campanha, campanhaIndex) => (
                      <li
                        className="ml-6 mt-6 flex items-center gap-2"
                        key={campanhaIndex}
                      >
                        <FaFlagCheckered /> {campanha.name}{" "}
                        {campanha.funis?.length !== undefined
                          ? `${campanha.funis.length} funis`
                          : ""}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <div className="flex items-center px-5 py-1">
              <button
                type="button"
                onClick={() => createCampanha(index)}
                className="text-black m-5"
              >
                <FaRegPenToSquare />
              </button>
              <button
                type="button"
                onClick={() => handleDeletePasta(pasta.id)}
                className="text-black m-5"
              >
                <FaRegTrashCan />
              </button>
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
