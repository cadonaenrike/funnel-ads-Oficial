import SignUpComponent from "@/components/signUpComponent";
import Image from "next/image";

export default function signUp() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 bg-cyan-50 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto h-52 w-56"
            src="/images/funnrlads _dark.png"
            width={220}
            height={199}
            alt="Your Company"
            priority
          />
          <SignUpComponent />
        </div>
      </div>
    </>
  );
}
