import React, { ChangeEvent } from "react";

interface InputProps {
  placeholder: string;
  colorPlaceholder: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
}

function Input({
  type,
  placeholder,
  colorPlaceholder,
  value,
  onChange,
  onFocus,
  onBlur,
  isValid = true,
}: InputProps): JSX.Element {
  const borderColor = isValid ? "#ccc" : "red";
  return (
    <input
      type={type || "text"}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      style={{
        borderRadius: "15px",
        padding: "10px",
        outline: "none",
        border: `1px solid ${borderColor}`,
      }}
      className={`h- w-96 mt-2 mb-5 rounded-md placeholder:${colorPlaceholder} font-medium text-sm`}
    />
  );
}

export default Input;
