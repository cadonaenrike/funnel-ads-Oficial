import NavBar from "@/components/navBar";
import { deleteLead, getAllLeads } from "@/services/LeadsService";
import { LeadsType } from "@/types/LeadsType";
import { TagsType } from "@/types/TagsType";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaCirclePlus,
  FaCircleXmark,
  FaCloudArrowDown,
  FaCloudArrowUp,
  FaFloppyDisk,
  FaRegPenToSquare,
  FaRegTrashCan,
  FaUsers,
} from "react-icons/fa6";

type DataItem = Record<string, string | number | TagsType[]>;

export default function RelacaoDeLeads_Client() {
  const [file, setFiles] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const cancelButtonRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [leads, setLeads] = useState<LeadsType[]>([]);
  const [tags, setTags] = useState<TagsType[]>([]);
  const [selected, setSelected] = useState<string>("");

  const convertToXML = (
    dataArray: DataItem[],
    rootElementName: string,
    itemElementName: string
  ) => {
    const xmlDoc = document.implementation.createDocument(
      null,
      rootElementName,
      null
    );

    dataArray.forEach((dtItem) => {
      const itemElement = xmlDoc.createElement(itemElementName);

      Object.entries(dtItem).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle arrays differently (e.g., for tags)
          const arrayElement = xmlDoc.createElement(key);

          value.forEach((item) => {
            const arrayItemElement = xmlDoc.createElement("item");
            Object.entries(item).forEach(([arrayKey, arrayValue]) => {
              const arrayPropertyElement = xmlDoc.createElement(arrayKey);
              const arrayTextNode = xmlDoc.createTextNode(
                arrayValue.toString()
              );
              arrayPropertyElement.appendChild(arrayTextNode);
              arrayItemElement.appendChild(arrayPropertyElement);
            });
            arrayElement.appendChild(arrayItemElement);
          });

          itemElement.appendChild(arrayElement);
        } else {
          const propertyElement = xmlDoc.createElement(key);
          const textNode = xmlDoc.createTextNode(value.toString());
          propertyElement.appendChild(textNode);
          itemElement.appendChild(propertyElement);
        }
      });

      xmlDoc.documentElement.appendChild(itemElement);
    });

    const serializer = new XMLSerializer();
    const xmlString = serializer.serializeToString(xmlDoc);

    return xmlString;
  };

  const exportLeadsToXML = () => {
    const storedLeads = localStorage.getItem("leads");

    console.log("Stored Leads:", storedLeads);

    if (storedLeads && storedLeads.trim() !== "") {
      const leadsData: DataItem[] = JSON.parse(storedLeads);

      if (leadsData.length > 0) {
        const leadsXML = convertToXML(leadsData, "Leads", "Lead");

        console.log("Leads XML:", leadsXML);

        const blob = new Blob([leadsXML], { type: "application/xml" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "leads.xml";
        a.click();

        URL.revokeObjectURL(url);
      } else {
        alert("A lista de leads está vazia");
      }
    } else {
      alert("Não há leads armazenados");
    }
  };

  const handleImportFiles = () => {
    setShowModal(true);
  };

  const handleFiles = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleModalClose = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const arquivoSelecionado = files[0];
      setFiles(arquivoSelecionado);
      setSelectedFileName(arquivoSelecionado.name);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedLeads = await getAllLeads();
        setLeads(fetchedLeads);
        // Aqui você também pode adicionar uma chamada para buscar as tags, se estiverem sendo gerenciadas separadamente
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchInitialData();
  }, []);

  const getOptions = () => {
    const uniqueOptions: string[] = [];

    tags.forEach((tag) => uniqueOptions.push(tag.name));

    return Array.from(new Set(uniqueOptions));
  };

  const uniqueOptions = getOptions();

  const handleEditLead = (leadId: string) => {
    const leadEdit = leads.find((lead) => lead.id === leadId);

    if (leadEdit) {
      router.push({ pathname: "/CadastroDeLeads-Client", query: { leadId } });
    }
  };

  const handleNewLeads = () => {
    router.push("/CadastroDeLeads-Client");
  };
  const handleDelLeads = async (id: string) => {
    try {
      await deleteLead(id);
      const updatedLeads = leads.filter((lead) => lead.id !== id); // Remove o lead do estado
      setLeads(updatedLeads); // Atualiza o estado
    } catch (error) {
      console.error("Erro ao excluir lead:", error);
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelected(selectedValue);
  };

  const handleSalvarLead = (e: FormEvent) => {
    e.preventDefault();
    console.log(setFiles);
  };

  const filterLeads = leads.filter((lead) => {
    if (selected) {
      const leadTags = lead.tag?.map((tag) => tag.name.toLowerCase()) || [];
      return leadTags.includes(selected.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Meus Leads</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <section className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl ml-2">Relação de Leads</h1>
          <section className="flex gap-2">
            <button
              onClick={handleImportFiles}
              className="bg-blue-400 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
            >
              <FaCloudArrowUp />
              Importar
            </button>
            <button
              onClick={exportLeadsToXML}
              className="bg-blue-400 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
            >
              <FaCloudArrowDown />
              Exportar
            </button>
            <button
              onClick={handleNewLeads}
              className="bg-amber-500 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
            >
              <FaCirclePlus />
              Lead
            </button>
          </section>
        </section>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "start",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h2>Filtrar por</h2>
          <select
            value={selected}
            onChange={handleSelectChange}
            name="filtro"
            id=""
            className="w-60 placeholder:text-neutral-400 bg-slate-100 h-10 rounded-lg focus:outline-none"
            placeholder="Filtrar por"
          >
            <option value=""></option>
            {uniqueOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Buscar por DDD"
            className="placeholder:text-neutral-400 bg-slate-100 h-10 rounded-lg focus:outline-none px-3"
          />
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
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
                  Tag
                </th>
                <th scope="col" className=" py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filterLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{lead.nome}</td>
                  <td className="px-6 py-4">{lead.email}</td>
                  <td className="px-6 py-4">{lead.celular}</td>
                  <td className="px-6 py-4">
                    {lead.tag?.map((tag) => (
                      <span key={tag.id}>{tag.name}, </span>
                    ))}
                  </td>
                  <td className="py-4">
                    <section className="flex gap-3">
                      <FaRegPenToSquare
                        className="text-xl cursor-pointer"
                        onClick={() => handleEditLead(lead.id)}
                      />
                      <FaRegTrashCan
                        className="text-xl cursor-pointer"
                        onClick={() => handleDelLeads(lead.id)}
                      />
                    </section>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {/* modal importar */}
      <Transition.Root show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 max-w-6xl"
          initialFocus={cancelButtonRef}
          onClose={handleModalClose}
        >
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
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
                <form
                  onSubmit={handleSalvarLead}
                  className="w-full flex items-center justify-center"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white">
                      <div className="-ml-4 pt-3">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="font-semibold leading-6 justify-between flex text-gray-900 border-b w-full pb-5 pt-3 pl-5"
                          >
                            Importar Leads
                            <button className="mr-4" onClick={handleModalClose}>
                              <FaCircleXmark className="text-neutral-600 hover:text-sky-600" />
                            </button>
                          </Dialog.Title>
                          <div className="mt-2 w-full flex flex-col py-7 pl-4 border-b">
                            <label
                              htmlFor="arquivo"
                              className="text-neutral-600"
                            >
                              Arquivo:
                            </label>
                            <button
                              onClick={handleFiles}
                              type="button"
                              className="border bg-neutral-100 selection:border-cyan-300 h-10 w-11/12  rounded-lg px-2 mb-5 flex items-center justify-center"
                            >
                              {selectedFileName
                                ? `Arquivo Selecionado: ${selectedFileName}`
                                : "Clique para selecionar o arquivo"}
                              <input
                                className="z-10"
                                type="file"
                                name="arquivo"
                                id="arquivo"
                                style={{ display: "none" }}
                                accept="c/*"
                                ref={inputRef}
                                onChange={handleUpload}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full items-center gap-2 justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                      >
                        <FaFloppyDisk />
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Fechar
                      </button>
                    </div>
                  </Dialog.Panel>
                </form>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
