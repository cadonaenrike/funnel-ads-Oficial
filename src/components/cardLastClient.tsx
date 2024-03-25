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
    <div className="flex flex-col items-center rounded-md bg-white w-96 text-slate-800 p-5 shadow-lg h-[325px] relative">
      <h2 className="text-lg">{title}</h2>
      <div className="w-full overflow-y-auto">
        {lastClientsData.map((client, index) => (
          <>
            <section
              key={index}
              className="flex gap-5 my-5 border-2 p-4 rounded-2xl shadow-lg w-full"
            >
              <FaUser className="text-5xl rounded-lg" />
              <section>
                <p>{client.nome}</p>
                <span className="text-xs">{client.cargo}</span>
              </section>
            </section>
           
          </>
        ))}
      </div>
      {lastClientsData.length > 0 && (
        <div className="bg-white p-3">
          <Link
            href="/ADM/ADMUserList"
            passHref
            className="flex items-center w-full justify-end text-sm absolute bottom-3 right-3"
          >
            Ver todos <FaChevronRight className="text-sm" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default LastClientsCard;
