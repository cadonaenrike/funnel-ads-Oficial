interface CardsInfCons {
  title: string;
  value: string;
}

export default function CardsInfCons({ title, value }: CardsInfCons) {
  return (
    <>
      <section className="flex flex-col w-72 p-5 justify-center items-center gap-5 bg-sky-200 rounded-2xl text-sky-900 font-semibold">
        <p>{title}</p>
        <p>{value}</p>
      </section>
    </>
  );
}
