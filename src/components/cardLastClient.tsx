import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { SubUser } from "@/types/SubUsersTypes";
import { getLastThreeClients } from "@/services/SubUsersService";
import { FaUser, FaXbox } from "react-icons/fa6";

interface LastClientsCardProps {
  title: string;
}

// // Função para gerar dados falsos de clientes
// const generateFakeClients = (): SubUser[] => {
//   return [
//     {
//       id: "1",
//       nome: "João",
//       sobrenome: "Silva",
//       cpf: "123.456.789-00",
//       celular: "(11) 98765-4321",
//       cargo: "Desenvolvedor",
//       nivelAcesso: "1",
//       email: "joao@example.com",
//       foto: "https://via.placeholder.com/150",
//     },
//     {
//       id: "2",
//       nome: "Maria",
//       sobrenome: "Santos",
//       cpf: "987.654.321-00",
//       celular: "(11) 98765-1234",
//       cargo: "Designer",
//       nivelAcesso: "2",
//       email: "maria@example.com",
//       foto: "https://via.placeholder.com/150",
//     },
//     {
//       id: "3",
//       nome: "Pedro",
//       sobrenome: "Souza",
//       cpf: "456.789.123-00",
//       celular: "(11) 98765-5678",
//       cargo: "Analista",
//       nivelAcesso: "3",
//       email: "pedro@example.com",
//       foto: "https://via.placeholder.com/150",
//     },
//   ];
// };

const LastClientsCard: React.FC<LastClientsCardProps> = ({ title }) => {
  const [lastClientsData, setLastClientsData] = useState<SubUser[]>([]);

  useEffect(() => {
    const fetchLastClients = async () => {
      try {
        const lastClients = await getLastThreeClients();
        setLastClientsData(lastClients || []);
        // const fakeClients = generateFakeClients();
        // setLastClientsData(fakeClients);
      } catch (error) {
        console.error("Erro ao obter os últimos clientes:", error);
      }
    };

    fetchLastClients();
  }, []);

  return (
    <div className="flex flex-col items-center rounded-md bg-white w-96 text-slate-800 p-5 shadow-lg gap-3">
      <h2 className="text-lg">{title}</h2>
      {lastClientsData.map((client, index) => (
        <section
          key={index}
          className="flex gap-5 my-3 border-2 p-5 rounded-2xl shadow-lg "
        >
          <FaUser className="text-5xl rounded-lg" />
          <section>
            <p>{client.nome}</p>
            <span className="text-xs">{client.cargo}</span>
          </section>
        </section>
      ))}
      {lastClientsData.length > 0 && (
        <div className="flex items-center w-full justify-end text-sm">
          <FaChevronRight className="text-sm" /> <span>Ver todos</span>
        </div>
      )}
    </div>
  );
};

export default LastClientsCard;
