import NavBar from "@/components/navBar";
import MyProfiles from "@/components/myProfile";
import useAdminCheck from "@/services/AdmService";

export default function MyProfile() {
  useAdminCheck();
  return (
    <>
      <NavBar /> <MyProfiles />
    </>
  );
}
