import React, { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { FaChevronRight, FaFlagCheckered } from "react-icons/fa6";
import { getAllPastas } from "@/services/PastaService"; // Ajuste o caminho conforme necessário
import { Pasta } from "@/types/PasteTypes"; // Ajuste o caminho conforme necessário

interface CardProps {
  title: string;
  value?: string;
  children?: React.ReactNode;
  showLink?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function CardsCampanha({
  title,
  value,
  children,
  showLink = true,
}: CardProps) {
  const [pastas, setPastas] = useState<Pasta[]>([]);

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const fetchedPastas = await getAllPastas();
        setPastas(fetchedPastas);
      } catch (error) {
        console.error("Erro ao buscar pastas:", error);
      }
    };

    fetchPastas();
  }, []);

  return (
    <div
      className={`flex items-center rounded-md bg-white w-96 text-slate-800 flex-col p-5 shadow-lg gap-3 ${poppins.className}`}
    >
      <h2 className="text-lg">{title}</h2>
      <section className="flex gap-10 items-center py-4 ">
        <section className="flex flex-col w-full ">
          <div className="bg-white max-w-screen-xl mx-auto p-10 flex-col flex rounded-lg shadow-xl">
            {children ||
              pastas.map((pasta) => (
                <div
                  key={pasta.id}
                  className="bg-white w-full border-b-2 mx-auto flex justify-around items-center m-2"
                >
                  <FaFlagCheckered /> {pasta.name}
                </div>
              ))}
          </div>
        </section>
        <h2 className="text-6xl">{value}</h2>
      </section>
      {showLink && (
        <Link
          href="/CLIENTE/RelacaoDePasta-Client"
          className="flex items-center w-full justify-end text-sm"
        >
          Ver todos <FaChevronRight className="text-sm" />
        </Link>
      )}
    </div>
  );
}
