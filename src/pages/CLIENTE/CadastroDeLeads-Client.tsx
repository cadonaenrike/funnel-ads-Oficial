import NavBar from "@/components/navBar";
import { addLead, getAllLeads, updateLead } from "@/services/LeadsService";
import { getAllTags } from "@/services/TagsService";
import { LeadsType } from "@/types/LeadsType";
import { TagsType } from "@/types/TagsType";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import {
  FaCirclePlus,
  FaRegFloppyDisk,
  FaUsers,
  FaXmark,
} from "react-icons/fa6";
import Select from "react-select";
import { string } from "yup";

interface Options {
  readonly value: string;
  readonly label: string;
}

export default function CadastroDeLeads_Client() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTags, setSelectedTags] = useState<Options[]>([]);
  const [allTags, setAllTags] = useState<Options[]>([]);
  const [leadIdState, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await getAllTags();
        const tagsForSelect: Options[] = allTags.map((tag) => ({
          value: tag.id.toString(),
          label: tag.name,
        }));
        setAllTags(tagsForSelect);
      } catch (error) {
        console.error("Erro ao obter as tags:", error);
      }
    };

    fetchTags();
  }, [router]); // Dependências do useEffect

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { leadId, nome, celular, email, tags } = router.query;
        if (leadId) {
          setLeadId(leadId as string);
          setName(nome as string);
          setCelular(celular as string);
          setEmail(email as string);
          if (tags) {
            const tagsArray = (tags as string).split(",");
            const selectedTagsData = tagsArray.map((tag: string) => ({
              value: tag,
              label: tag,
            }));
            setSelectedTags(selectedTagsData);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
      }
    };
    fetchLeads();
  }, [router.query]);

  const handleTagsChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
  };

  const handleTag = (e: FormEvent) => {
    e.preventDefault();
    router.push("/CLIENTE/CadastroDeTags-Client");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const useridcapturado = sessionStorage.getItem("idUser");
    if (!useridcapturado) {
      alert("Não possui usuário logado");
      router.push("/Login");
      return;
    }
    const leadData: Omit<LeadsType, "id"> = {
      nome: name,
      celular: celular,
      email: email,
      userid: useridcapturado,
      tag: selectedTags.map((tag) => ({ id: tag.value, name: tag.label })),
    };

    try {
      if (leadIdState) {
        await updateLead(leadIdState, leadData);
      } else {
        await addLead(leadData);
      }
      router.push("/CLIENTE/RelacaoDeLeads-Client");
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Meus Leads</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col rounded-lg shadow-lg">
        <section className="flex flex-row justify-between items-center px-3 pt-5 pb-2">
          <h1 className="font-semibold text-2xl ml-2">
            {leadIdState ? "Editar Lead" : "Cadastrar Lead"}
          </h1>
        </section>
        <form onSubmit={handleSubmit}>
          <div className="px-5 pb-2">
            <section className="flex w-full flex-col">
              <h2>Nome</h2>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Primeiro nome"
                className="placeholder:text-neutral-400 bg-slate-100 h-12 rounded-lg focus:outline-none px-3"
              />
            </section>
            <section className="flex w-full flex-col">
              <h2>Celular</h2>
              <input
                required
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                type="text"
                placeholder="(00) 000000-0000"
                className="placeholder:text-neutral-400 bg-slate-100 h-12 rounded-lg focus:outline-none px-3"
              />
            </section>
            <section className="flex w-full flex-col">
              <h2>E-mail</h2>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="exemplo@example.com"
                className="placeholder:text-neutral-400 bg-slate-100 h-12 rounded-lg focus:outline-none px-3"
              />
            </section>
            <section className="flex w-full flex-row gap-9">
              <section className="w-full">
                <h2>Tag</h2>
                <Select
                  isMulti
                  options={allTags}
                  value={selectedTags}
                  onChange={handleTagsChange}
                />
              </section>
              <button
                onClick={handleTag}
                className="px-5 h-12 rounded-lg flex items-center gap-2 bg-amber-500 mt-6 text-white"
                type="button"
              >
                <FaCirclePlus />
                Tag
              </button>
            </section>
          </div>
          <hr className="w-full" />
          <div className="mt-5 sm:rounded-sm flex justify-end px-5 pb-4">
            <button
              className="font-medium gap-5"
              style={{
                backgroundColor: "#f5f5f5",
                color: "#022D46",
                height: "44px",
                width: "160px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="button"
              onClick={() => router.back()}
            >
              <FaXmark />
              Cancelar
            </button>
            <button
              className="hover:bg-sky-700 font-semibold text-white"
              style={{
                backgroundColor: "#064b72",
                marginLeft: "15px",
                height: "44px",
                width: "160px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              type="submit"
            >
              <FaRegFloppyDisk className="mr-5" />
              Salvar
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
