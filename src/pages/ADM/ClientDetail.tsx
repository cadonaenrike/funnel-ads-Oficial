import CardsClient from "@/components/cardsClients";
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

        <section className="flex flex-wrap max-w-screen-xl gap-5 items-center justify-center">
          <CardsClient aditionalClass="bg-gray-200">
            <FaUser className="items-center flex h-full w-full text-green-600" />
          </CardsClient>
          <CardsClient>
            <h3 className="font-semibold text-gray-500">Dados do Cliente</h3>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Razão Social: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              CNPj/CPF: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Contato: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Telefone: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2 flex flex-wrap">
              Endereço:{" "}
              <span className="font-normal">
                Lorem ipsum Lorem ipsum Lorem ipsum
              </span>
              <span className="font-normal">Lorem ipsum</span>
              <span className="font-normal">Lorem ipsum</span>
              <span className="font-normal">Lorem ipsum</span>
              <span className="font-normal">Lorem ipsum</span>
              <span className="font-normal">Lorem ipsum</span>
            </p>
          </CardsClient>
          <CardsClient>
            <h3 className="font-semibold text-gray-500">Plano</h3>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Plano: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Valor: <span className="font-normal">R$ 55,00</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Período: <span className="font-normal">Lorem ipsum</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Status: <span className="font-normal">ATIVO</span>
            </p>
            <p className="text-sm font-semibold text-sky-950 my-2">
              Usuários: <span className="font-normal">5</span>
            </p>
          </CardsClient>
        </section>

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
