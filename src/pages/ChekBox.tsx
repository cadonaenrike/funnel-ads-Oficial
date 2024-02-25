import React, { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";

export default function RoundCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="checkbox"
        className="hidden"
        checked={isChecked}
        onClick={handleCheckboxChange}
      />
      <label
        htmlFor="checkbox"
        className={`cursor-pointer flex items-center justify-center w-6 h-6 border border-gray-300 rounded-full focus:outline-none focus:ring focus:border-blue-300 ${
          isChecked ? "bg-white" : "bg-transparent"
        }`}
      >
        {isChecked && (
          <div className="w-4 h-4 bg-white rounded-full transform scale-100">
            {" "}
            <FaRegCircleCheck />{" "}
          </div>
        )}
      </label>
      <span className="ml-2">Checkbox Redondo</span>
    </div>
  );
}
