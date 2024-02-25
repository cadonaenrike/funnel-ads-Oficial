import NavBar from "@/components/navBar";
import { addLead, getAllLeads, updateLead } from "@/services/LeadsService";
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
import Select, { GroupBase, OptionsOrGroups } from "react-select";

interface Options {
  readonly value: string;
  readonly label: string;
  options?: OptionsOrGroups<TagsType, GroupBase<TagsType>> | undefined;
}
const SELECTED_TAGS_KEY = "selectedTags";
const LEADS_KEY = "leads";

export default function CadastroDeLeads_Client() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [selectedTags, setSelectedTags] = useState<Options[]>([]);
  const [allTags, setAllTags] = useState<Options[]>([]);
  const [leads, setLeads] = useState<LeadsType[]>([]);
  const [leadIdState, setLeadId] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);

  const cancel = () => {
    router.back();
  };

  useEffect(() => {
    const storedTags = localStorage.getItem(SELECTED_TAGS_KEY);
    if (storedTags) {
      const parsedTags: Options[] = JSON.parse(storedTags);
      setSelectedTags(parsedTags);
    }

    const storedAllTags = localStorage.getItem("tags");
    if (storedAllTags) {
      const parsedAllTags: TagsType[] = JSON.parse(storedAllTags);

      const tagsForSelect: Options[] = parsedAllTags.map((tag) => ({
        value: tag.id.toString(),
        label: tag.name,
      }));

      setAllTags(tagsForSelect);
    }
  }, []); // Este useEffect só precisa rodar uma vez, quando o componente monta

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const allLeads = await getAllLeads(); // Busca todos os leads do backend
        setLeads(allLeads);

        const { leadId } = router.query;
        if (leadId) {
          const leadEdit = allLeads.find(
            (lead: LeadsType) => lead.id === leadId
          );
          if (leadEdit) {
            setLeadId(leadId as string);
            setName(leadEdit.name);
            setCelular(leadEdit.celular?.toString() || "");
            setEmail(leadEdit.email);
            setSelectedTags(
              leadEdit.tag.map((tag: TagsType) => ({
                value: tag.id,
                label: tag.name,
              }))
            );
          }
        }
      } catch (error) {
        console.error("Erro ao buscar leads:", error);
        // Aqui você pode adicionar qualquer lógica de tratamento de erro, como exibir uma mensagem para o usuário
      }
    };

    fetchLeads();
  }, [router.query]);

  const handleTagsChange = (selectedOptions: any) => {
    setSelectedTags(selectedOptions);
    localStorage.setItem(SELECTED_TAGS_KEY, JSON.stringify(selectedOptions));
  };

  const handleTag = (e: FormEvent) => {
    e.preventDefault();
    router.push("/CadastroDeTags-Client");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const leadData: Omit<LeadsType, "id"> = {
      name,
      celular,
      email,
      tag: selectedTags.map((tag) => ({ id: tag.value, name: tag.label })),
    };

    try {
      if (leadIdState) {
        // Atualiza um lead existente
        await updateLead(leadIdState, leadData);
      } else {
        // Adiciona um novo lead
        await addLead(leadData);
      }

      // Redirecionamento ou feedback de sucesso pode ser implementado aqui
      router.push("/RelacaoDeLeads-Client");
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      // Implemente feedback de erro conforme necessário
    }
  };
  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Meus Leads</h1>
      </section>
      {alertType && (
        <div
          className={`animate-rotate-x animate-once mb-4 absolute top-2 right-2 rounded-lg  ${
            alertType === "success" ? "bg-success-300" : "bg-rose-300"
          } px-6 py-3 text-base ${
            alertType === "success" ? "text-success-700" : "text-rose-700"
          }`}
          role="alert"
        >
          {alertType === "success"
            ? "Cadastrado com sucesso"
            : "Erro ao cadastrar"}
        </div>
      )}
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col rounded-lg shadow-lg">
        <section className="flex flex-row justify-between items-center px-3 pt-5 pb-2">
          <h1 className="font-semibold text-2xl ml-2">
            {leadIdState ? "Editar Lead" : "Cadastrar Lead"}
          </h1>
        </section>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              marginBottom: "10px",
              justifyContent: "start",
              flexDirection: "column",
              gap: "10px",
            }}
            className="px-5 pb-2"
          >
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
              onClick={cancel}
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
