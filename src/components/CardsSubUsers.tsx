// components/CardsSubUsers.tsx

import React, { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { SubUser } from "@/types/SubUsersTypes";
import { getSubUsers } from "@/services/SubUsersService";

interface CardProps {
  title: string;
  value?: string;
  children?: ReactNode;
  showLink?: boolean;
}

export default function CardsSubUsers({
  title,
  value,
  children,
  showLink = true,
}: CardProps) {
  const [subUsers, setSubUsers] = useState<SubUser[]>([]);

  useEffect(() => {
    const fetchSubUsers = async () => {
      try {
        const fetchedSubUsers = await getSubUsers();
        if (fetchedSubUsers !== null) {
          setSubUsers(fetchedSubUsers);
        } else {
          // Tratar o caso em que não há subusuários
          console.error("Nenhum subusuário encontrado");
        }
      } catch (error) {
        console.error("Erro ao obter subusuários:", error);
      }
    };

    fetchSubUsers();
  }, []);

  return (
    <div className="flex items-center rounded-md bg-white w-96 text-slate-800 flex-col p-5 shadow-lg gap-3">
      <h2 className="text-lg">{title}</h2>
      <section className="flex gap-10 items-center py-4">
        <section className="flex flex-col w-full">{children}</section>
        <h2 className="text-6xl">{value || subUsers.length}</h2>
      </section>
      {showLink && (
        <Link href="/ADM/ADMUserList" passHref>
          <div className="flex items-center w-full justify-end text-sm">
            Ver todos <FaChevronRight className="text-sm" />
          </div>
        </Link>
      )}
    </div>
  );
}
