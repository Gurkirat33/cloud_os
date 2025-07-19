import AuthBottomBar from "@/lib/AuthBottomBar";
import SignInForm from "@/components/auth/SignInForm";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black/50 z-0 backdrop-blur-lg"></div>
      <Image
        src="/background_auth.jpg"
        alt="background"
        width={1900}
        height={1080}
        className="w-full h-screen object-cover"
      />
      <AuthBottomBar />
      <div className="absolute inset-0 flex items-center justify-center">
        <SignInForm />
      </div>
    </div>
  );
}
