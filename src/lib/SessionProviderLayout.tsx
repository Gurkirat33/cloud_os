import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export default async function SessionProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
