import CustomerRelationship from "@/components/CustomerRelationship";
import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";

export default function CadNewUser() {
  useAdminCheck();
  return (
    <>
      <NavBar />
      <CustomerRelationship />
    </>
  );
}
