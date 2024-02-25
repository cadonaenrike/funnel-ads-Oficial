import { useState } from "react";

export default function ToggleSwitch() {
  const [toggle, setToggle] = useState(true);
  const toggleClass = " transform translate-x-8";
  return (
    <div
      className={`md:w-14 md:h-7 w-12 h-6 flex items-center border-2 border-gray-200 rounded-full p-1 cursor-pointer shadow-lg ${
        !toggle ? "bg-primary border-none" : ""
      }`}
      onClick={() => {
        setToggle(!toggle);
      }}
    >
      <div
        className={
          "bg-white shadow-lg h-7 w-7 rounded-full -ml-2 transform duration-300 ease-in-out" +
          (toggle ? null : toggleClass)
        }
      ></div>
    </div>
  );
}
