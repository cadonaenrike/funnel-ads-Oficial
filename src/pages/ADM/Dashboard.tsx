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
import CardHelps from "@/components/cardHelps";

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

        <CardHelps title="Suporte ao Cliente" />

        {/* <Cards title="Tarefas" showLink={false}>
          <section className="flex w-80 justify-start gap-5 items-center pl-3 ">
            <section className="flex flex-row items-center gap-6">
              <p>06:34</p>
              <section className="flex flex-col">
                <section className="flex flex-col items-center w-2 gap-0.5">
                  <section>
                    <div className="w-1 h-5 "></div>
                  </section>
                  <section>
                    <div className="w-5 h-5 rounded-full bg-emerald-500"></div>
                  </section>
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                </section>
              </section>
            </section>

            <span className="text-sm font-normal">
              Reactive bottom-line throughput
            </span>
          </section>

          <section className="flex w-80 gap-5 items-center pl-3  justify-start">
            <section className="flex flex-row items-center gap-6">
              <p>06:34</p>
              <section className="flex flex-col">
                <section className="flex flex-col items-center w-2 gap-0.5">
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                  <section>
                    <div className="w-5 h-5 rounded-full bg-sky-500"></div>
                  </section>
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                </section>
              </section>
            </section>
            <span className="text-sm font-normal">
              Programmable high-level function
            </span>
          </section>

          <section className="flex w-80 flex-row gap-5 items-center pl-3  justify-start">
            <section className="flex flex-row items-center gap-6">
              <p>06:34</p>
              <section className="flex flex-col">
                <section className="flex flex-col items-center w-2 gap-0.5">
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                  <section>
                    <div className="w-5 h-5 rounded-full bg-rose-500"></div>
                  </section>
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                </section>
              </section>
            </section>

            <span className="text-sm font-normal">
              Automated foreground ability
            </span>
          </section>

          <section className="flex w-80 flex-row gap-5 items-center pl-3  justify-start">
            <section className="flex flex-row items-center gap-6">
              <p>06:34</p>
              <section className="flex flex-col">
                <section className="flex flex-col items-center w-2 gap-0.5">
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                  <section>
                    <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
                  </section>
                  <section>
                    <div className="w-1 h-5  bg-neutral-200"></div>
                  </section>
                </section>
              </section>
            </section>
            <span className="text-sm font-normal">
              Integrated static middleware
            </span>
          </section>
        </Cards> */}
      </section>
    </>
  );
}
