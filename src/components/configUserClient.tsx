import { FaEllipsisV } from "react-icons/fa";
import ToggleSwitch from "./toogleSwitch";

export default function ConfigUserClient() {
  return (
    <table className="min-w-full text-left text-sm font-light">
      <thead className="border-b dark:border-neutral-500">
        <tr>
          <th scope="col" className="w-28 py-4 font-normal text-center">
            Usuário
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Dashboard
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Pastas
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Campanhas
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Transmissão
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Automoção
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Fluxos...
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Configurações
          </th>
          <th scope="col" className="w-4 py-4 font-normal">
            Bate-papo
          </th>
          <th scope="col" className="w-4 py-4 font-normal"></th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap py-4 font-medium">
            <section className="flex flex-col items-center">
              <p>Emanoel</p>
              <span className="text-primary">emanoel@emanoel.com</span>
            </section>
          </td>
          <td className="whitespace-nowrap py-6 ">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3 py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6 pl-5 flex">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <FaEllipsisV
              className="hover:text-primary hover:cursor-pointer"
              size={20}
            />
          </td>
        </tr>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4 font-medium">
            <section className="flex flex-col items-center">
              <p>Everton</p>
              <span className="text-primary">everton@everton.com</span>
            </section>
          </td>
          <td className="whitespace-nowrap py-6 ">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3 py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6 pl-5 flex">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <FaEllipsisV
              className="hover:text-primary hover:cursor-pointer"
              size={20}
            />
          </td>
        </tr>
        <tr className="border-b dark:border-neutral-500">
          <td className="whitespace-nowrap px-6 py-4 font-medium">
            <section className="flex flex-col items-center">
              <p>Paola</p>
              <span className="text-primary">paola@paola.com</span>
            </section>
          </td>
          <td className="whitespace-nowrap py-6 ">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3 py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap pl-3  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6 pl-5 flex">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-6">
            <ToggleSwitch />
          </td>
          <td className="whitespace-nowrap  py-4">
            <FaEllipsisV
              className="hover:text-primary hover:cursor-pointer"
              size={20}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
