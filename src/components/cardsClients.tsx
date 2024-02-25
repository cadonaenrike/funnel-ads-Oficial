interface CardsClientProps {
  children: React.ReactNode;
  aditionalClass?: string;
}

export default function CardsClient({
  children,
  aditionalClass,
}: CardsClientProps) {
  const combinedClassName = `flex flex-col p-5 rounded-lg w-96 h-80 border-2 ${
    aditionalClass || ""
  }`;
  return (
    <>
      <section className={combinedClassName}>{children}</section>
    </>
  );
}
