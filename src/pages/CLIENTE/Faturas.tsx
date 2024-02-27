import { useEffect, useState } from "react";
import NavBar from "@/components/navBar";
import { FaRegFileAlt } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";
import { Invoice, statusColors } from "@/types/InvoiceTypes";
import {
  getCustomerIdByCpf,
  getInvoicesByUserId,
} from "@/services/FaturasService";
import { GetUserById } from "@/services/GetUserService";

export default function ADMRelatoFaturamento() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [userId, setUserId] = useState<string>("");
  const [cpf, setCpf] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handlePaymentLinkClick = (Href: string) => {
    window.open(Href, "_blank");
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      setLoading(true);
      try {
        const getUser = await GetUserById();
        if (getUser?.cpf) {
          const userId = await getCustomerIdByCpf(getUser.cpf);
          setUserId(userId);
          setCpf(getUser.cpf);
        } else {
          setCpf(null);
        }
      } catch (error) {
        console.error("Erro ao buscar Id:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (!userId) return;

      try {
        const fetchedInvoices = await getInvoicesByUserId(userId);
        setInvoices(fetchedInvoices);
      } catch (error) {
        console.error("Erro ao buscar faturas:", error);
      }
    };

    if (userId) {
      fetchInvoices();
    }
  }, [userId]);

  if (loading) {
    return (
      <>
        <NavBar />
        <section className="flex max-w-screen-xl mx-auto text-sky-950 text-2xl mt-10 mb-5">
          <FaRegFileAlt />
          <h1 className="ml-2 font-semibold">Faturas</h1>
        </section>

        <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
          <h1 className="font-semibold text-2xl ml-2">Histórico de faturas</h1>

          <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
            <div>Carregando...</div>;
          </div>
        </section>
      </>
    );
  }

  if (cpf === null) {
    return (
      <>
        <NavBar />
        <section className="flex max-w-screen-xl mx-auto text-sky-950 text-2xl mt-10 mb-5">
          <FaRegFileAlt />
          <h1 className="ml-2 font-semibold">Faturas</h1>
        </section>

        <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
          <h1 className="font-semibold text-2xl ml-2">Histórico de faturas</h1>

          <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2 p-4 justify-center">
            Voce não possui faturas!!
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="flex max-w-screen-xl mx-auto text-sky-950 text-2xl mt-10 mb-5">
        <FaRegFileAlt />
        <h1 className="ml-2 font-semibold">Faturas</h1>
      </section>

      <section className="bg-white max-w-screen-xl mt-5 mx-auto flex flex-col p-5 rounded-lg shadow-lg">
        <h1 className="font-semibold text-2xl ml-2">Histórico de faturas</h1>

        <div className="relative overflow-x-auto mt-5 sm:rounded-sm border-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Plano
                </th>
                <th scope="col" className="px-6 py-3">
                  Período
                </th>
                <th scope="col" className="px-6 py-3">
                  Valor
                </th>
                <th scope="col" className="px-6 py-3">
                  Vencimento
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4">{invoice.description}</td>
                  <td className="px-6 py-4">
                    <p className="bg-cyan-50 rounded-md px-3 py-1 text-cyan-600 ml-auto text-xs text-center border border-cyan-600">
                      Mensal
                    </p>
                  </td>
                  <td className="px-6 py-4">{`R$ ${invoice.value.toFixed(
                    2
                  )}`}</td>
                  <td className="px-6 py-4">{invoice.dueDate}</td>
                  <td className="px-6 py-4">
                    <p
                      className={`rounded-md px-3 py-1 ${
                        statusColors[invoice.status]?.background
                      } ml-auto text-xs text-center border 
                      ${statusColors[invoice.status]?.border} 
                      ${statusColors[invoice.status]?.text}`}
                    >
                      {invoice.status}
                    </p>
                  </td>
                  <td className="px-6 py-4 flex flex-col">
                    <button
                      onClick={() => handlePaymentLinkClick(invoice.invoiceUrl)}
                    >
                      <CiCreditCard1 className="text-center text-xl ml-4 text-sky-900" />
                    </button>
                    <button
                      onClick={() =>
                        handlePaymentLinkClick(invoice.bankSlipUrl)
                      }
                    >
                      <IoEyeSharp className="text-center text-xl ml-4 text-sky-900" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
