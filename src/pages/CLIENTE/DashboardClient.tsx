import CardsCampanha from "@/components/cardsCampanha";
import Cardsgraphic from "@/components/cardsGraphic";
import CardsLeads from "@/components/cardsLeads";
import Cards from "@/components/cardsLeads";
import DonutChart from "@/components/donutChart";
import Graphics from "@/components/graphics";
import NavBar from "@/components/navBar";

import { FaDesktop, FaGithub, FaXbox } from "react-icons/fa6";
import { IoPerson, IoPeopleSharp } from "react-icons/io5";

export default function DashboardClient() {
  return (
    <>
      <NavBar />
      <section className="flex items-center max-w-screen-xl mx-auto text-sky-950 text-2xl mt-10 mb-5 pl-12">
        <FaDesktop />
        <h1 className="font-semibold ml-2">Dashboard</h1>
      </section>
      <section className="flex items-start my-3 max-w-screen-xl h-auto justify-center mx-auto gap-4 flex-wrap font-semibold">
        <CardsLeads title="Total de Leads">
          <IoPerson className="text-blue-600 text-7xl" />
        </CardsLeads>
        <CardsLeads title="Total de Leads Ativos">
          <IoPeopleSharp className="text-green-500 text-7xl" />
        </CardsLeads>
        <CardsLeads title="Total de Leads Inativos">
          <IoPeopleSharp className="text-red-600 text-7xl" />
        </CardsLeads>
        <Cardsgraphic title="Resultados do Funil" showLink={false}>
          <Graphics types="line" />
        </Cardsgraphic>
        <Cardsgraphic title="Visitantes no site" showLink={false}>
          <Graphics types="bar" />
        </Cardsgraphic>
        <CardsCampanha title="Minhas Campanhas" showLink={true}></CardsCampanha>
      </section>
    </>
  );
}
