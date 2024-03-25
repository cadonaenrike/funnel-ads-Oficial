import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { SubUser } from "@/types/SubUsersTypes";
import { getLastThreeClients } from "@/services/SubUsersService";
import { FaUser, FaXbox } from "react-icons/fa6";
import { HelpType } from "@/types/HelpType";
import { getAllHelps } from "@/services/HelpService";
import Link from "next/link";

interface LastClientsCardProps {
  title: string;
}

const CardHelps: React.FC<LastClientsCardProps> = ({ title }) => {
  const [helps, setHelps] = useState<HelpType[]>([]);

  useEffect(() => {
    const fetchHelps = async () => {
      try {
        const helps = await getAllHelps();
        console.log(helps);
        setHelps(helps);
      } catch (error) {
        console.error("Erro ao obter os últimos clientes:", error);
      }
    };

    fetchHelps();
  }, []);

  return (
    <div className="flex flex-col items-center rounded-md bg-white w-[500px] text-slate-800 p-5 h-[500px] shadow-lg gap-3 relative">
      <h2 className="text-lg">{title}</h2>

      <div className="w-full overflow-y-auto">
        {helps.map((help, index) => (
          <>
            <section
              key={index}
              className=" my-5 w-full border-2 p-5 rounded-2xl shadow-lg "
            >
              <p>{help.data?.topico}</p> <br />
              <div
                className="text-xs"
                dangerouslySetInnerHTML={{
                  __html: help.data?.descrição || "",
                }}
              />
            </section>
            
          </>
        ))}
        {helps.length > 0 && (
          <div className="flex items-center w-full justify-end text-sm bg-white p-3 absolute bottom-3 right-3">
            <FaChevronRight className="text-sm" />{" "}
            <Link href={"/ADM/Help"}>
              <span>Ver todos</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardHelps;
