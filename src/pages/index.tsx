import NavBar from "@/components/navBar";
import { PrimeReactProvider } from "primereact/api";

export default function Home() {
  return (
    <PrimeReactProvider value={{ unstyled: true, pt: {} }}>
      <NavBar />
    </PrimeReactProvider>
  );
}
