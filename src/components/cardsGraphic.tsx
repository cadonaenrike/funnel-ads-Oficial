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
  weight: "600",
});
export default function Cardsgraphic({
  title,
  value,
  children,
  showLink = true,
}: CardProps) {
  return (
    <div
      className={`flex items-center rounded-md bg-white w-96 text-slate-800 flex-col p-5 shadow-lg gap-3 ${poppins.className}`}
    >
      <h2 className="text-lg">{title}</h2>
      <section className="flex gap-10 items-center py-4 ">
        <section className="flex flex-col w-full ">{children}</section>
        <h2 className="text-6xl">{value}</h2>
      </section>
      {showLink && (
        <Link
          href={""}
          className="flex items-center w-full justify-end text-sm"
        >
          Ver todos <FaChevronRight className="text-sm" />
        </Link>
      )}
    </div>
  );
}
