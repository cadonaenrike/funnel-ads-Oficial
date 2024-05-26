import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Importe o estilo do React Quill, se necessário

interface EditorTextoProps {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
}

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function EditorTexto({
  placeholder,
  value,
  setValue,
}: EditorTextoProps) {
  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Verdana",
    "Roboto",
  ];

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <>
      <ReactQuill
        id="myQuillEditor"
        value={value}
        onChange={(value) => setValue(value)}
        placeholder={placeholder || "Start typing..."}
        modules={modules}
        formats={formats}
        className="h-80"
      />
    </>
  );
}
