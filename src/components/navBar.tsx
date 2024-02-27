import { useGlobalContext } from "@/globalContext/userAdmin";
import { fetchUserData, getAdm } from "@/services/GetUserService";
import { Menu, Transition } from "@headlessui/react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  FaDesktop,
  FaChevronRight,
  FaChartBar,
  FaServer,
  FaArrowRightFromBracket,
  FaUser,
  FaCircleUser,
  FaFilter,
  FaRegAddressCard,
} from "react-icons/fa6";
import { FaCogs, FaRegFileAlt } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import { useRouter } from "next/router";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "500",
});

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const { setUser } = useGlobalContext();
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAdminStatus = async () => {
      const isAdm = sessionStorage.getItem("isAdm");
      const idUser = sessionStorage.getItem("idUser");

      if (isAdm === "true" && idUser) {
        try {
          const response = await getAdm(Number(idUser));
          if (response && response.isadmin === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Erro ao verificar o status de admin:", error);
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, []);

  const exitDashBoard = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isAdm");
    sessionStorage.removeItem("idUser");
    router.push("/ADM/Dashboard");
  };

  // const capitFirsLett = (str: string) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  // const user: string | null = localStorage.getItem("user");
  // const name: string = user ? capitFirsLett(user) : "";

  return (
    <>
      {isAdmin ? (
        /* Navbar para Administradores */
        <nav
          className={`bg-slate-800 border-gray-200 dark:bg-gray-900 dark:border-gray-700 py-2 max-h-16 shadow-sm ${poppins.className}`}
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
            <Image
              className="mx-auto ml-0"
              src="/images/logo-horizontal-white.png"
              width={200}
              height={150}
              alt="Your Company"
            />

            <Link
              href="Dashboard"
              className="inline-flex items-center gap-x-1.5 text-white font-medium text-sm px-3 py-2 hover:text-cyan-600"
            >
              {" "}
              <FaDesktop className=" h-5 w-5 mr-3" /> Dashboard
            </Link>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaChartBar className=" h-5 w-5 mr-3" aria-hidden="true" />
                  Relatórios
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="ADMRelatoClient"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Clientes
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="ADMRelatoConsuClie"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Consumo por Clientes
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="Plans"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Planos
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="ADMRelatofaturamento"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Faturamento
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="ADMUserList"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Usuários
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaServer className=" h-5 w-5 mr-3" aria-hidden="true" />
                  Cadastros
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="CadNewUser"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Usuários
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="Plans"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Planos
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="Help"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Ajuda
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link
              onClick={exitDashBoard}
              href="/Login"
              className="inline-flex items-center px-3 py-2 text-white font-medium text-sm hover:text-cyan-600"
            >
              <FaArrowRightFromBracket className=" h-5 w-5 mr-3" /> Sair
            </Link>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaUser className=" h-5 w-5 mr-3" aria-hidden="true" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="MyProfile"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaCircleUser />
                          Meus Dados
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={exitDashBoard}
                          href="/Login"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaArrowRightFromBracket />
                          Sair
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <p className="ml-2 text-white">{name}</p> */}
          </div>
        </nav>
      ) : (
        /* Navbar Padrão */
        <nav
          className={`bg-slate-800 border-gray-200 dark:bg-gray-900 dark:border-gray-700 py-2 max-h-16 shadow-sm ${poppins.className}`}
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
            <Image
              className="mx-auto ml-0"
              src="/images/logo-horizontal-white.png"
              width={200}
              height={150}
              alt="Your Company"
            />

            <Link
              href="/CLIENTE/DashboardClient"
              className="inline-flex items-center gap-x-1.5 text-white font-medium text-sm px-3 py-2 hover:text-cyan-600"
            >
              <FaDesktop className=" h-5 w-5 mr-3" /> Dashboard
            </Link>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaFilter className=" h-5 w-5 mr-3" aria-hidden="true" />
                  Funil
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Abrir
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="https://funil-diagrama.vercel.app/"
                          target="_blank"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Novo
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          target="_blank"
                          href="https://visual-editor-eight.vercel.app"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Landing Page
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaChartBar className=" h-5 w-5 mr-3" aria-hidden="true" />
                  Relatórios
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="#"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Funil
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/RelacaoDeLeads-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Leads
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none bg-transparent px-3 py-2 font-medium text-sm text-white hover:text-cyan-600">
                  <FaServer className=" h-5 w-5 mr-3" aria-hidden="true" />
                  Cadastros
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/RelacaoDeLeads-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Leads
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/RelacaoDeTags-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Tags
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/RelacaoDePasta-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Pasta
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/Campanha-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Campanhas
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/Usuario-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaChevronRight />
                          Usuários
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <Link
              onClick={exitDashBoard}
              href="/Login"
              className="inline-flex items-center px-3 py-2 text-white font-medium text-sm hover:text-cyan-600"
            >
              {" "}
              <FaArrowRightFromBracket className=" h-5 w-5 mr-3" /> Sair
            </Link>

            <Menu as="div" className={"relative inline-block text-left"}>
              <div>
                <Menu.Button className="inline-flex w-full justify-center items-center gap-x-1.5 border-none rounded-full bg-gray-300 px-2.5 py-2 mb-2 font-medium text-sm text-white hover:text-cyan-600">
                  <MdPhotoCamera
                    className=" text-gray-400 h-7 w-6 "
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transtion ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-6 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-3">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/MyData"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaCircleUser />
                          Meus Dados
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/MyData"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaRegAddressCard />
                          Minha Conta
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/Faturas"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaRegFileAlt />
                          Faturas
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/CLIENTE/Configuracao-Client"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaCogs />
                          Configurações
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          onClick={exitDashBoard}
                          href="/Login"
                          className={classNames(
                            active
                              ? "bg-slate-800 text-cyan-600"
                              : "text-white",
                            "flex px-4 py-2 text-sm items-center gap-2"
                          )}
                        >
                          <FaArrowRightFromBracket />
                          Sair
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* <p className="ml-2 text-white">{name}</p> */}
          </div>
        </nav>
      )}
    </>
  );
}
