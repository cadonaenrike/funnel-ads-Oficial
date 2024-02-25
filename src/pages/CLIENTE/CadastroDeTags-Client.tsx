import NavBar from "@/components/navBar";
import { TagsType } from "@/types/TagsType";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { FaRegFloppyDisk, FaRotate, FaTags, FaXmark } from "react-icons/fa6";

export default function CadastroDeTags_Client() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState<TagsType[]>([]);
  const router = useRouter();
  const [tagsId, setTagsId] = useState<number | null>(null);
  useEffect(() => {
    const loadTags = () => {
      const storedTags = localStorage.getItem("tags");
      if (storedTags) {
        setTags(JSON.parse(storedTags));
      }
    };

    loadTags();
  }, []);

  const cancel = () => {
    router.back();
  };

  useEffect(() => {
    const storedTags = localStorage.getItem("tags");
    if (storedTags) {
      const parsedTags = JSON.parse(storedTags);
      setTags(parsedTags);

      const { id } = router.query;

      if (id) {
        setTagsId(parseInt(id as string, 10));
        const tagsEdit = parsedTags.find(
          (t: TagsType) => t.id === parseInt(id as string, 10)
        );

        if (tagsEdit) {
          setNewTag(tagsEdit.name);
        }
      }
    }
  }, [router.query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (newTag.trim() === "") {
      return;
    }

    const tagObject: TagsType = {
      id: tagsId || Date.now(),
      name: newTag,
    };

    const updatedTags = tagsId
      ? tags.map((tag) => (tag.id === tagObject.id ? tagObject : tag))
      : [...tags, tagObject];

    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
    setNewTag("");
    setTagsId(null);

    router.back();
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
      </section>
    </>
  );
}
