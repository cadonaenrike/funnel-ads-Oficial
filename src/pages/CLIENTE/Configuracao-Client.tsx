import TwoFactorAuthenticationCard from "@/components/TwoFactorAuthenticationCard";
import ConfigUserClient from "@/components/configUserClient";
import DadosCadClient from "@/components/dadosCadClient";
import IntegrationSection from "@/components/integracao";
import NavBar from "@/components/navBar";
import { useState } from "react";
import { FaCogs } from "react-icons/fa";
import { FaCircle, FaEye, FaRegCopy, FaShieldHalved } from "react-icons/fa6";

export default function ConfiguracaoClient() {
  const [active, setActive] = useState<number | null>(0);
  const [selected, setSelected] = useState(false);

  const handleSelected = () => {
    setSelected(!selected);
    console.log(selected);
  };

  const handleSection = (i: number) => {
    setActive((prevI) => (prevI === i ? null : i));
    setSelected(false);
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
                    {selected ? <FaCircle className="text-primary-500" /> : ""}
                  </section>
                  <section className="px-3 py-2">
                    <h3 className="text-xl text-slate-700 font-semibold">
                      Starter
                    </h3>
                    <ul
                      className="text-zinc-700 font-normal text-sm ml-5"
                      style={{ listStyle: "inside" }}
                    >
                      <li>Outra Descrição</li>
                      <li>Be or not Be</li>
                      <li>B4</li>
                    </ul>
                  </section>
                </section>
                <section className="flex items-center">
                  <p className="font-semibold text-lg text-slate-800">R$</p>
                  <h2 className="text-5xl font-semibold text-slate-800">
                    199,99
                  </h2>
                  <span className="ml-2 text-neutral-600">/mês</span>
                </section>
              </section>
            </section>
          )}

          {active === 4 && (
            <section className="flex w-full h-auto flex-col gap-3 p-8">
              <section className="border-2 border-dotted px-6 py-7 bg-sky-50 border-sky-600 flex items-center gap-3 rounded-lg">
                <FaShieldHalved size={40} className="text-primary" />
                <section className="px-3 py-2">
                  <h3 className="text-xl text-zinc-700">Token</h3>
                  <p className="text-base text-neutral-600 mt-2">
                    O token é gerado de maneira única, caso você clique em
                    &quot;<em>Gerar Token</em>&quot; o token atual será
                    substituido e todas as aplicações com o token antigo não
                    irão mais funcionar.
                  </p>
                </section>
              </section>
              <section className="flex items-center gap-3">
                <input
                  type="text"
                  className="rounded-lg bg-slate-50 p-2 w-8/12 outline-none"
                  disabled
                />
                <FaEye />
              </section>
              <section className="flex items-center gap-3">
                <input
                  type="text"
                  className="rounded-lg bg-slate-50 p-2 w-8/12 outline-none"
                  disabled
                />
                <button className="p-2 bg-slate-800 text-white rounded-lg w-48 hover:bg-primary-600">
                  Gerar Token
                </button>
                <button className="flex items-center gap-2 text-slate-800">
                  <FaRegCopy />
                  <u>Copiar Token</u>
                </button>
              </section>
            </section>
          )}
          {active === 5 && (
            <section className="flex w-full h-auto flex-col gap-3 p-8">
              {" "}
              <IntegrationSection />
            </section>
          )}
        </section>
      </section>
    </>
  );
}
