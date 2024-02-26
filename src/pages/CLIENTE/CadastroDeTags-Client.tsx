import NavBar from "@/components/navBar";
import { TagsType } from "@/types/TagsType";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { FaRegFloppyDisk, FaRotate, FaTags, FaXmark } from "react-icons/fa6";
import {
  addTag,
  updateTag,
  getAllTags,
  deleteTag,
} from "@/services/TagsService";

export default function CadastroDeTags_Client() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<TagsType[]>([]);
  const router = useRouter();
  const [tagsId, setTagsId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData = await getAllTags();
        setTags(tagsData);
      } catch (error) {
        console.error("Erro ao obter as tags:", error);
      }
    };

    fetchTags();
  }, []);

  const cancel = () => {
    router.push("/CLIENTE/CadastroDeTags-Client");
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setTagsId(id as string);
      const tagEdit = tags.find((tag) => tag.id === id);
      if (tagEdit) {
        setNewTag(tagEdit.name);
      }
    }
  }, [router.query, tags]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (newTag.trim() === "") {
      return;
    }

    try {
      if (tagsId) {
        await updateTag(tagsId, newTag);
      } else {
        await addTag(newTag);
      }
      const updatedTags = await getAllTags();
      setTags(updatedTags);
      setNewTag("");
      setTagsId(null);
      router.push("/CLIENTE/CadastroDeTags-Client");
    } catch (error) {
      console.error("Erro ao salvar a tag:", error);
    }
  };

  const handleDelete = async (tagId: string) => {
    try {
      await deleteTag(tagId);
      const updatedTags = await getAllTags();
      setTags(updatedTags);
    } catch (error) {
      console.error("Erro ao excluir a tag:", error);
    }
  };

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaTags />
        <h1 className="ml-2 font-semibold">Tags</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <section className="flex flex-row justify-between items-center">
          <h1 className="font-semibold text-2xl ml-2">
            {tagsId ? "Editar" : "Cadastrar"} Tag
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
          >
            <h2>Nome da Tag</h2>
            <input
              required
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              type="text"
              placeholder="ex.: Emagrecer"
              className="placeholder:text-neutral-400 bg-slate-100 h-10 rounded-lg focus:outline-none px-3"
            />
          </div>

          <div className="mt-5 sm:rounded-sm flex justify-end">
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
              {tagsId ? (
                <>
                  <FaRotate className="mr-5" /> Atualizar{" "}
                </>
              ) : (
                <>
                  <FaRegFloppyDisk className="mr-5" />
                  Salvar
                </>
              )}
            </button>
          </div>
        </form>

        {/* Lista de tags */}
        <div className="mt-5">
          <h2 className="font-semibold mb-2">Lista de Tags</h2>
          <ul>
            {tags.map((tag) => (
              <li key={tag.id}>
                {tag.name}
                <button
                  onClick={() => handleDelete(tag.id)}
                  className="ml-2 text-red-500"
                >
                  Excluir
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
