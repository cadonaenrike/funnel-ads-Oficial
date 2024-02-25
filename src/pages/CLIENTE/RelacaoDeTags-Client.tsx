import { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import { useRouter } from "next/router";
import {
  FaCirclePlus,
  FaRegPenToSquare,
  FaRegTrashCan,
  FaTags,
} from "react-icons/fa6";
import { TagsType } from "@/types/TagsType";

interface Tag {
  id: string;
  name: string;
}

export default function RelacaoDeLeads_Client() {
  const router = useRouter();

  const [tags, setTags] = useState<TagsType[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleNewTag = () => {
    router.push("/CadastroDeTags-Client");
  };

  useEffect(() => {
    const storedTags = localStorage.getItem("tags");

    if (storedTags) {
      const parsedTags: Tag[] = JSON.parse(storedTags);
      setTags(parsedTags);
      setFilteredTags(parsedTags);
    }
  }, []);

  useEffect(() => {
    const filtered = tags
      .filter((tag): tag is Tag => !!tag)
      .filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setFilteredTags(filtered);
  }, [searchTerm, tags]);

  const handleDelTags = (id: string) => {
    const storedTags = localStorage.getItem("tags");

    if (storedTags) {
      const parsedTags: TagsType[] = JSON.parse(storedTags);

      const tagsIndex = parsedTags.findIndex((tags) => tags.id === id);

      if (tagsIndex !== -1) {
        const updatedTags = [
          ...parsedTags.slice(0, tagsIndex),
          ...parsedTags.slice(tagsIndex + 1),
        ];

        setTags(updatedTags);
        localStorage.setItem("tags", JSON.stringify(updatedTags));
      }
    }
  };

  const handleEditTags = (id: string) => {
    const editTags = tags.find((tag) => tag.id === id);

    if (editTags) {
      router.push({ pathname: "/CadastroDeTags-Client", query: { id } });
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
          <h1 className="font-semibold text-2xl ml-2">Minhas Tags</h1>
          <section className="flex gap-2">
            <button
              onClick={handleNewTag}
              className="bg-amber-500 h-12 px-12 py-2 rounded-lg text-white font-semibold flex flex-row gap-2 items-center"
            >
              <FaCirclePlus />
              Tags
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
          <input
            type="text"
            placeholder="Buscar por nome da tag"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="placeholder:text-neutral-400 bg-slate-100 h-10 rounded-lg focus:outline-none px-3"
          />
        </div>
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 w-11/12 py-3">
                  Tag
                </th>
                <th scope="col" className=" py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTags.map((tag) => (
                <tr
                  key={tag.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 w-11/12 py-4">{tag.name}</td>
                  <td className="py-4">
                    <section className="flex gap-3">
                      <FaRegPenToSquare
                        className="text-xl cursor-pointer"
                        onClick={() => handleEditTags(tag.id)}
                      />
                      <FaRegTrashCan
                        className="text-xl cursor-pointer"
                        onClick={() => handleDelTags(tag.id)}
                      />
                    </section>
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
