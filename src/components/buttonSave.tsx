import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  image: string;
  onClickFunction?: () => void;
  className?: string;
}

export default function ButtonSave({
  children,
  onClickFunction,
  image,
  className,
}: ButtonProps): JSX.Element {
  const handleClick = () => {
    if (onClickFunction) {
      onClickFunction();
    }
  };

  return (
    <button
      className={`flex justify-center g-2 items-center text-white px-6  p-4 rounded-3xl w-96 ${className}`}
      onClick={handleClick}
    >
      <Image
        className="mr-2 "
        style={{ filter: "invert(1)" }}
        src={image}
        width={12}
        height={12}
        priority
        alt={""}
      />{" "}
      {children}
    </button>
  );
}
