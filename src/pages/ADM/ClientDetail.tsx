import CardsClient from "@/components/CardsSubUsers";
import CardsInfCons from "@/components/cardsInfoConsumo";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { FaUsers, FaUser } from "react-icons/fa6";

export default function ClientDetail() {
  useAdminCheck();
  return (
    <>
      <NavBar />
      <section className="flex items-center max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5 pl-12">
        <FaUsers />
        <h1 className="font-semibold ml-2">Clientes</h1>
      </section>
      <section className="flex flex-col rounded-lg shadow-lg bg-gray-100 max-w-screen-xl mx-auto h-auto p-4 mb-4">
        <h2 className="font-semibold text-xl p-5 ml-3">
          Informações do Cliente
        </h2>

        <h2 className="font-semibold text-xl text-gray-500 my-3 p-5 ml-3">
          Informações do Consumo
        </h2>

        <section className="flex flex-row w-full gap-5 justify-center">
          <CardsInfCons title="Total de Campanha" value="0" />
          <CardsInfCons title="Total de Campanha" value="0" />
          <CardsInfCons title="Total de Campanha" value="0" />
          <CardsInfCons title="Total de Campanha" value="0" />
        </section>

        <section className="flex flex-col p-5 rounded-lg  h-auto border-2 mt-5">
          <p className="text-sm font-semibold text-sky-950">
            Campanha: <span className="font-normal">Nome da Campanha</span>
          </p>
          <p className="text-sm font-semibold text-sky-950 ">
            Funil: <span className="font-normal">Nome Funil</span>
          </p>
          <p className="text-sm font-semibold text-sky-950 ">
            Data Início: <span className="font-normal">20/11/2023</span>
          </p>
          <p className="text-sm font-semibold text-sky-950">
            Leads: <span className="font-normal">30%</span>
          </p>
        </section>
      </section>
    </>
  );
}
