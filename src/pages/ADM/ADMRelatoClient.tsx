import React, { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";

import {
  FaChartSimple,
  FaEye,
  FaFacebook,
  FaGithub,
  FaPhotoFilm,
  FaUser,
  FaUsers,
  FaXbox,
} from "react-icons/fa6";
import { SubUser } from "@/types/SubUsersTypes";
import { PlanType } from "@/types/PlanType";
import { getSubUsers } from "@/services/SubUsersService";
import { getPlanById } from "@/services/PlanService";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Link from "next/link";

export default function RelatoClient() {
  useAdminCheck();
  const [subUsers, setSubUsers] = useState<SubUser[]>([]);
  const [plans, setPlans] = useState<{ [key: string]: PlanType | null }>({});

  useEffect(() => {
    const fetchSubUsersAndPlans = async () => {
      const users = await getSubUsers();
      if (users) {
        setSubUsers(users);
        const plansData = await Promise.all(
          users.map((user) =>
            user.plano ? getPlanById(user.plano) : Promise.resolve(null)
          )
        );
        const plansMap = plansData.reduce((acc, plan, index) => {
          const planId = users[index].plano || "unknown";
          //@ts-ignore
          acc[planId] = plan;
          return acc;
        }, {});
        setPlans(plansMap);
      }
    };

    fetchSubUsersAndPlans();
  }, []);

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaUsers />
        <h1 className="ml-2 font-semibold">Clientes</h1>
      </section>
      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5">
        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ícone
                </th>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Contato
                </th>
                <th scope="col" className="px-6 py-3">
                  Telefone
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-3">
                  Plano
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {subUsers.map((user) => {
                const userPlan = plans[user.plano!] || {
                  nome: "Plano não contratado",
                };
                return (
                  <tr key={user.id} className="border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                      <FaUser />
                    </td>
                    <td className="px-6 py-4">
                      {user.nome} {user.sobrenome}
                    </td>
                    <td className="px-6 py-4">{user.cargo}</td>
                    <td className="px-6 py-4">{user.celular}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{userPlan.nome}</td>

                    <td className="px-6 py-4">
                      <div style={{ display: "flex" }}>
                        <Link href={"/ADM/ClientDetail"}>
                          <FaEye className="text-lg text-sky-900 cursor-pointer mr-2" />
                        </Link>
                        <Link href={"/ADM/ADMRelatoConsuClie"}>
                          <FaChartSimple className="text-lg text-sky-900 cursor-pointer" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
