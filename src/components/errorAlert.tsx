import { MdError } from "react-icons/md";

export default function ErrorAlert({ text }: { text: string }) {
  return (
    <div className="text-red-500 bg-[#faeded] px-5 rounded my-5 py-5 items-center border border-[#ef4444] flex justify-center">
      <MdError className="col-span-1 text-xl me-2" />{" "}
      <p className="col-span-11">{text}</p>
    </div>
  );
}
