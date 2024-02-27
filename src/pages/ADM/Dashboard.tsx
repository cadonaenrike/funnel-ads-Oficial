import CardsCampanha from "@/components/cardsCampanha";
import Cards from "@/components/cardsCampanha";
import CardsClient from "@/components/CardsSubUsers";
import Cardsgraphic from "@/components/cardsGraphic";
import CardsLeads from "@/components/cardsLeads";
import DonutChart from "@/components/donutChart";
import Graphics from "@/components/graphics";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import { FaDesktop, FaGithub, FaXbox } from "react-icons/fa6";
import { IoPerson, IoPeopleSharp } from "react-icons/io5";
import CardsSubUsers from "@/components/CardsSubUsers";
import LastClientsCard from "@/components/cardLastClient";

export default function Dashboard() {
  useAdminCheck();
  return (
    <>
      <NavBar />
      <section className="flex items-center max-w-screen-xl mx-auto text-sky-950 text-2xl mt-10 mb-5 pl-12">
        <FaDesktop />
        <h1 className="font-semibold ml-2">Dashboard</h1>
      </section>
      <section className="flex items-start my-3 max-w-screen-xl h-auto justify-center mx-auto gap-4 flex-wrap font-semibold">
        <CardsSubUsers title="Total de Clientes">
          <IoPerson className="text-blue-600 text-7xl" />
        </CardsSubUsers>
        <CardsSubUsers title="Total de Clientes Ativos">
          <IoPeopleSharp className="text-green-500 text-7xl" />
        </CardsSubUsers>
        <CardsSubUsers title="Total de Clientes Inativos">
          <IoPeopleSharp className="text-red-600 text-7xl" />
        </CardsSubUsers>
        <Cardsgraphic title="Resultados do Funil" showLink={false}>
          <Graphics types="line" />
        </Cardsgraphic>
        <Cardsgraphic title="Visitantes no site" showLink={false}>
          <Graphics types="bar" />
        </Cardsgraphic>
        <CardsCampanha title="Minhas Campanhas" showLink={true}></CardsCampanha>

        <LastClientsCard title="Últimos Clientes" />

        <Cards title="Suporte ao Cliente" showLink={false}>
          <section className="flex w-full  gap-5 my-2 items-center border-l-green-500 border-l-4 pl-3 py-3">
            <input type="checkbox" name="chekBox1" id="" className="h-5 w-5" />
            <section className="flex flex-col">
              <span className="text-sm">Create Company Logo</span>
              <span className="font-extralight text-xs">a 1 dia</span>
            </section>
            <p className="bg-emerald-50 rounded-md px-3 py-1 text-emerald-500 ml-auto text-xs">
              Iniciado
            </p>
          </section>

          <section className="flex w-full gap-5 my-2 items-center border-l-sky-500 border-l-4 pl-3 py-3">
            <input type="checkbox" name="chekBox1" id="" className="h-5 w-5" />
            <section className="flex flex-col">
              <span className="text-sm">Stakeholder Meeting</span>
              <span className="font-extralight text-xs">a 3 dia</span>
            </section>
            <p className="bg-sky-50 rounded-md px-3 py-1 text-sky-500 ml-auto text-xs">
              Novo
            </p>
          </section>

          <section className="flex w-full  gap-5 my-2 items-center border-l-rose-500 border-l-4 pl-3 py-3">
            <input type="checkbox" name="chekBox1" id="" className="h-5 w-5" />
            <section className="flex flex-col">
              <span className="text-sm">Projeto Meeting</span>
              <span className="font-extralight text-xs">21 Set 2023</span>
            </section>
            <p className="bg-rose-50 rounded-md px-3 py-1 text-rose-500 ml-auto text-xs">
              Cancelado
            </p>
          </section>

          <section className="flex w-full gap-5 my-2 items-center border-l-yellow-400 border-l-4 pl-3 py-3">
            <input type="checkbox" name="chekBox1" id="" className="h-5 w-5" />
            <section className="flex flex-col">
              <span className="text-sm">Projeto Meeting</span>
              <span className="font-extralight text-xs">21 Set 2023</span>
            </section>
            <p className="bg-yellow-50 rounded-md px-3 py-1 text-yellow-400 ml-auto text-xs">
              Cancelado
            </p>
          </section>

          <section className="flex w-full gap-5 my-2 items-center border-l-violet-600 border-l-4 pl-3 py-3">
            <input type="checkbox" name="chekBox1" id="" className="h-5 w-5" />
            <section className="flex flex-col">
              <span className="text-sm">Get Customer Feedback</span>
              <span className="font-extralight text-xs">20 Set 2022</span>
            </section>
            <p className="bg-violet-50 rounded-md px-3 py-1 text-violet-600 ml-auto text-xs">
              Encerrado
            </p>
          </section>
        </Cards>
      </section>
    </>
  );
}
