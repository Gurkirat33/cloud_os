import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreatePinForm from "@/components/auth/CreatePinForm";
import EnterPinForm from "@/components/auth/EnterPinForm";

export default async function PinPage() {
  const session = await auth();

  console.log("session", session);

  if (!session?.user) {
    redirect("/sign-in");
  }

  const hasPin = session.user.pin !== null;

  return (
    <>
      {hasPin ? (
        <EnterPinForm user={session.user} />
      ) : (
        <CreatePinForm user={session.user} />
      )}
    </>
  );
}
