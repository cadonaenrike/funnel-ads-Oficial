import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { SubUser } from "@/types/SubUsersTypes";
import { getLastThreeClients } from "@/services/SubUsersService";
import { FaUser, FaXbox } from "react-icons/fa6";
import Link from "next/link";

interface LastClientsCardProps {
  title: string;
}

const LastClientsCard: React.FC<LastClientsCardProps> = ({ title }) => {
  const [lastClientsData, setLastClientsData] = useState<SubUser[]>([]);

  useEffect(() => {
    const fetchLastClients = async () => {
      try {
        const lastClients = await getLastThreeClients();
        setLastClientsData(lastClients || []);
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
        <Link
          href="/ADM/ADMUserList"
          passHref
          className="flex items-center w-full justify-end text-sm"
        >
          Ver todos <FaChevronRight className="text-sm" />
        </Link>
      )}
    </div>
  );
};

export default LastClientsCard;
