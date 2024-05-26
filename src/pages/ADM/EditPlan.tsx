import EditorTexto from "@/components/editorTexto";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { addPlan, updatePlan } from "@/services/PlanService";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  FaArrowsRotate,
  FaRegFloppyDisk,
  FaRegStar,
  FaXmark,
} from "react-icons/fa6";

export default function EditPlan() {
  const router = useRouter();
  const id = router.query.id as string;
  const [loading, setLoading] = useState(false);

  interface PlanForm {
    nome: string;
    valor: number;
    descricao: string;
  }

  const [form, setForm] = useState<PlanForm>({
    nome: (router.query.nome as string) || "",
    valor: Number(router.query.valor as string) || 0,
    descricao: (router.query.descricao as string) || "",
  });

  const [requiredTopico, setRequiredTopico] = useState(false);

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  };

  const unformatCurrency = (formattedValue: string) => {
    return Number(formattedValue.replace(/[R$\.,]/g, "")) / 100;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const unformattedValue = unformatCurrency(event.target.value);
    setForm({ ...form, valor: unformattedValue });
  };

  const handleAddPlan = async () => {
    if (!form.nome) {
      setRequiredTopico(true);
      return;
    }

    setLoading(true);

    !router.query.id
      ? await addPlan(form)
      : await updatePlan(id, form.nome, form.valor, form.descricao);

    router.push("/ADM/Plans");
  };

  useAdminCheck();
  return (
    <>
      <NavBar />

      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaRegStar />
        <h1 className="ml-2 font-semibold">Planos</h1>
      </section>
      <section className=" bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg shadow-xl">
        <h1 className="font-semibold text-2xl  text-slate-800">Editar Plano</h1>

        <section className="flex w-full flex-row gap-5 mt-3">
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="nomePlano" className="text-gray-500">
              Nome do Plano:
            </label>
            <input
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              type="text"
              name="nomePlano"
              placeholder="Ex: Starter"
              className={`rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2 ${
                requiredTopico ? "border-2 border-red-500" : ""
              }`}
            />
          </section>
          <section className="flex w-full flex-col gap-2">
            <label htmlFor="valor" className="text-gray-500">
              Valor:
            </label>
            <input
              value={formatCurrency(form.valor)}
              onChange={handleChange}
              type="text"
              name="valor"
              onKeyPress={(event) => {
                if (!/[0-9,]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
              placeholder="0,00"
              className="rounded-lg bg-gray-100 focus:bg-gray-200 focus:outline-none py-2 px-2"
            />
          </section>
        </section>

        <section className="mt-3 flex flex-col gap-3 pb-10">
          <h2 className="text-gray-500 font-bold">Descrição do plano</h2>
          <EditorTexto
            value={form.descricao}
            setValue={(e) => setForm({ ...form, descricao: e })}
            placeholder={"Typings"}
          />
        </section>
        <div className="flex justify-end mt-4">
          <button
            className="font-medium gap-5"
            onClick={() => router.push("/ADM/Plans")}
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
          >
            <FaXmark />
            Cancelar
          </button>

          <button
            className="hover:bg-cyan-600 font-semibold text-white bg-cyan-950"
            onClick={handleAddPlan}
            style={{
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
            {loading ? (
              <span className="loader" />
            ) : (
              <>
                {router.query.id ? (
                  <>
                    <FaArrowsRotate className="mr-5" /> Atualizar{" "}
                  </>
                ) : (
                  <>
                    <FaRegFloppyDisk className="mr-5" /> Salvar{" "}
                  </>
                )}
              </>
            )}
          </button>
        </div>
      </section>
    </>
  );
}
