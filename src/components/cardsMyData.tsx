import { Poppins } from "next/font/google";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

interface CardProps {
  title: string;
  value?: string;
  children?: React.ReactNode;
  showLink?: boolean;
}
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});
export default function CardsMyData({
  title,
  value,
  children,
  showLink = true,
}: CardProps) {
  return (
    <div
      className={`flex items-center rounded-xl border-solid border-slate-200 border-2  bg-white text-slate-800 flex-col px-4  ${poppins.className}`}
    >
      <section className="flex gap-1 items-center mx-5 ">
        <section className="flex flex-col w-full h-max ">{children}</section>
        <h2 className="text-xl font-normal ">{value}</h2>
      </section>
      <h2 className="text-sm font-normal mb-3">{title}</h2>
    </div>
  );
}
