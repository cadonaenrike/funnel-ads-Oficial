import AddTokenModal from "@/components/AddTokenModal";
import TwoFactorAuthenticationCard from "@/components/TwoFactorAuthenticationCard";
import ConfigUserClient from "@/components/configUserClient";
import DadosCadClient from "@/components/dadosCadClient";
import IntegrationSection from "@/components/integracao";
import NavBar from "@/components/navBar";
import { getPlanByUserId } from "@/services/PlanService";
import {
  deleteToken,
  getTokens,
  postToken,
  updateToken,
} from "@/services/tokenService";
import { PlanType } from "@/types/PlanType";
import { TokenData } from "@/types/tokenTypes";
import { useEffect, useState } from "react";
import { FaCogs } from "react-icons/fa";
import { FaCircle, FaEye, FaRegCopy, FaShieldHalved } from "react-icons/fa6";

export default function ConfiguracaoClient() {
  const [active, setActive] = useState<number | null>(0);
  const [selected, setSelected] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [tokenModal, setTokenModal] = useState<
    (TokenData & { open: boolean }) | undefined
  >(undefined);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [plan, setPlan] = useState<PlanType>();

  const handleSelected = () => {
    setSelected(!selected);
  };

  const handleSection = (i: number) => {
    setActive((prevI) => (prevI === i ? null : i));
    setSelected(false);
  };

  const handleCadastroToken = async ({
    nome,
    token,
    edit,
  }: {
    nome: string;
    token: string;
    edit: boolean;
  }) => {
    if (edit) {
      await updateToken(tokenModal?.id!, { nome, token });
      setTokens(
        tokens.map((t) => (t.id === tokenModal?.id ? { ...t, nome, token } : t))
      );
    } else {
      await postToken({ nome, token });
      setTokens([...tokens, { nome, token }]);
    }
  };

  useEffect(() => {
    async function fetchTokens() {
      setTokensLoading(true);
      try {
        const Tokens = await getTokens();

        setTokens(Tokens);
        setTokensLoading(false);
      } catch (error) {
        console.error("Erro ao obter dados de Plans:", error);
      }
    }

    async function getPlan() {
      const plan = await getPlanByUserId();
      if (plan) setPlan(plan);
    }
    getPlan();
  }, []);

  const handleDeleteToken = async (id: string) => {
    setTokens(tokens.filter((t) => t.id !== id));
    await deleteToken(id);
  };

  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(number)
      .slice(2);
  };

  return (
    <>
      <NavBar />
      <section className="flex  max-w-screen-xl mx-auto text-sky-950 text-4xl mt-10 mb-5">
        <FaCogs />
        <h1 className="font-semibold text-2xl ml-2">Configurações</h1>
      </section>
      <section className="bg-white max-w-screen-xl my-5 mx-auto flex flex-col p-5 rounded-lg">
        <nav className="flex gap-5 border-b-2 pb-3">
          <ul>
            <li
              onClick={() => handleSection(0)}
              className={`cursor-pointer -mb-3.5 pb-3   ${
                active === 0 ? "border-b-2 border-cyan-600" : ""
              }`}
            >
              Dados Cadastrais
            </li>
          </ul>
          <ul>
            <li
              onClick={() => handleSection(1)}
              className={`cursor-pointer -mb-3.5 pb-3 ${
                active === 1 ? "border-b-2 border-cyan-600 " : ""
              }`}
            >
              Segurança da Conta
            </li>
          </ul>
          <ul>
            <li
              onClick={() => handleSection(2)}
              className={`cursor-pointer -mb-3.5 pb-3 ${
                active === 2 ? "border-b-2 border-cyan-600 " : ""
              }`}
            >
              Usuários
            </li>
          </ul>
          <ul>
            <li
              onClick={() => handleSection(3)}
              className={`cursor-pointer -mb-3.5 pb-3 ${
                active === 3 ? "border-b-2 border-cyan-600" : ""
              }`}
            >
              Planos
            </li>
          </ul>
          <ul>
            <li
              onClick={() => handleSection(4)}
              className={`cursor-pointer -mb-3.5 pb-3 ${
                active === 4 ? "border-b-2 border-cyan-600" : ""
              }`}
            >
              Tokens
            </li>
          </ul>
          <ul>
            <li
              onClick={() => handleSection(5)}
              className={`cursor-pointer -mb-3.5 pb-3 ${
                active === 5 ? "border-b-2 border-cyan-600" : ""
              }`}
            >
              Integração
            </li>
          </ul>
        </nav>
        <section>
          {active === 0 && (
            <section className="flex w-full h-auto p-8">
              <DadosCadClient />
            </section>
          )}

          {active === 1 && (
            <section className="flex w-full h-auto p-8">
              <TwoFactorAuthenticationCard />
            </section>
          )}

          {active === 2 && (
            <section className="flex w-full h-auto p-8">
              <ConfigUserClient />
            </section>
          )}

          {active === 3 && (
            <section className="flex w-full h-auto p-8">
              {plan ? (
                <section
                  onClick={() => handleSelected()}
                  className={`border-2 w-full border-dotted cursor-pointer px-6 py-2 hover:border-primary-500 flex items-center gap-3 rounded-lg justify-between ${
                    selected ? "border-primary-500" : ""
                  }`}
                >
                  <section className="flex items-center gap-10">
                    <section
                      className={`h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center ${
                        selected ? "border-primary-500 border-4 bg-white" : ""
                      }`}
                    >
                      {selected ? (
                        <FaCircle className="text-primary-500" />
                      ) : (
                        ""
                      )}
                    </section>
                    <section className="px-3 py-2">
                      <h3 className="text-xl text-slate-700 font-semibold">
                        {plan.nome}
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: plan.descricao || "",
                        }}
                      />
                    </section>
                  </section>
                  <section className="flex items-center">
                    <p className="font-semibold text-lg text-slate-800">R$</p>
                    <h2 className="text-5xl font-semibold text-slate-800">
                      {formatCurrency(plan.valor)}
                    </h2>
                    <span className="ml-2 text-neutral-600">/mês</span>
                  </section>
                </section>
              ) : (
                <p>Você não tem nenhum plano associado a sua conta.</p>
              )}
            </section>
          )}

          {active === 4 &&
            (tokensLoading ? (
              <>
                <div className=" w-full flex justify-center text-center">
                  <span className="loader blue-loader mt-10"></span>
                </div>
              </>
            ) : (
              <section className="flex w-full h-auto flex-col gap-3 p-8">
                <button
                  onClick={() =>
                    setTokenModal({ nome: "", token: "", open: true })
                  }
                  className="p-2 bg-slate-800 text-white rounded-lg w-48 hover:bg-primary-600"
                >
                  Adicionar Token
                </button>
                <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
                  <thead className="text-xs text-gray-700 uppercase bg-zinc-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Nome
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Token
                      </th>
                      <th scope="col" className="px-6 py-3 text-right pe-10">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr
                        key={token.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <td className="px-6 py-4">{token.nome}</td>

                        <td>{token.token}</td>
                        <td className="px-6 py-4 flex justify-end pe-10">
                          <div className="flex gap-4 text-lg text-gray-700 flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                setTokenModal({
                                  id: token.id,
                                  nome: token.nome,
                                  token: token.token,
                                  open: true,
                                })
                              }
                              className="text-white m-5"
                            >
                              <img src="/icons/icon-edit-button.svg" />
                            </button>
                            <button
                              onClick={() => handleDeleteToken(token.id!)}
                              type="button"
                              className="text-white"
                            >
                              <img src="/icons/icon-delete-button.svg" />
                            </button>
                          </div>
                          {}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            ))}
          {active === 5 && (
            <section className="flex w-full h-auto flex-col gap-3 p-8">
              {" "}
              <IntegrationSection />
            </section>
          )}
        </section>
      </section>
      <AddTokenModal
        onOk={handleCadastroToken}
        isClose={() => setTokenModal(undefined)}
        isOpen={tokenModal}
      />
    </>
  );
}
