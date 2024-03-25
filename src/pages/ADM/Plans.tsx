import ListPlanos from "@/components/ListPlanos";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";

export default function Planos() {
  useAdminCheck();
  return (
    <>
      <NavBar /> <ListPlanos />
    </>
  );
}
