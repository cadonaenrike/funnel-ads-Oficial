import NavBar from "@/components/navBar";
import useAdminCheck from "@/services/AdmService";
import MyData from "@/components/myData";

export default function MyProfile() {
  useAdminCheck();
  return (
    <>
      <NavBar /> <MyData />
    </>
  );
}
