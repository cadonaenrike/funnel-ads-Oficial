import { deletePlan, getAllPlans } from "@/services/PlanService";
import { PlanType } from "@/types/PlanType";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChartSimple, FaCirclePlus, FaEye, FaRegStar } from "react-icons/fa6";

export default function ListPlanos() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [plans, setPlans] = useState<PlanType[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const plansData = await getAllPlans();

        setPlans(plansData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao obter dados de Plans:", error);
      }
    }
    fetchData();
  }, []);

  const handleClick = () => {
    router.push("/ADM/EditPlan");
  };

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(number);
  };

  const handleDelete = async (id: string) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    try {
      await deletePlan(id);
      setDeleteLoading(false);
      const updatedHelps = plans.filter(
        (plan) => plan.id?.toString() !== id.toString()
      );
      setPlans(updatedHelps);
      console.log("Ajuda excluída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir ajuda:", error);
    }
  };
  return (
    <>
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaRegStar />
        <h1 className="ml-2">Planos</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5">
        <section className="flex w-full justify-between items-center">
          <h1 className="font-semibold text-2xl ml-2 text-slate-800">
            Planos de serviços
          </h1>
          <button
            onClick={handleClick}
            className="bg-amber-500 px-12 py-2 rounded-xl text-white font-semibold flex flex-row gap-2 items-center"
          >
            <FaCirclePlus />
            Plano
          </button>
        </section>
        {loading ? (
          <div className=" w-full flex justify-center text-center">
            <span className="loader blue-loader mt-10"></span>
          </div>
        ) : (
          <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
            <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Nome
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Valor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Descrição
                  </th>
                  <th scope="col" className="w-96"></th>
                  <th scope="col" className="px-6 py-3">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{plan.nome}</td>
                    <td className="px-6 py-4">{formatCurrency(plan.valor)}</td>
                    <td className="px-6 py-4">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: plan.descricao || "",
                        }}
                      />
                    </td>
                    <td></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4 text-lg text-gray-700">
                        <button
                          onClick={() =>
                            router.push(
                              `/ADM/EditPlan?id=${
                                plan.id
                              }&nome=${encodeURIComponent(
                                plan.nome
                              )}&valor=${encodeURIComponent(
                                plan.valor
                              )}&descricao=${encodeURIComponent(
                                plan.descricao || ""
                              )}`
                            )
                          }
                          type="button"
                          className="text-white m-5"
                        >
                          <img src="/icons/icon-edit-button.svg" />
                        </button>
                        <button
                          onClick={() => handleDelete(plan.id!)}
                          type="button"
                          className="text-white"
                        >
                          <img src="/icons/icon-delete-button.svg" />
                        </button>
                      </div>
                      {}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
