import NavBar from "@/components/navBar";

import MyData from "@/components/myData";
import useAdminCheck from "@/services/AdmService";

export default function MyProfile() {
  return (
    <>
      <NavBar /> <MyData />
    </>
  );
}
