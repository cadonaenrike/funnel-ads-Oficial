import CadPla from "@/components/cadPlanos";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";

export default function CadNewPlan() {
  useAdminCheck();
  return (
    <>
      <NavBar /> <CadPla />
    </>
  );
}
