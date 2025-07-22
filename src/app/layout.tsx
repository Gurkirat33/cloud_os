import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProviderLayout from "@/lib/SessionProviderLayout";
import ReduxProvider from "@/components/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CloudOS",
  description:
    "CloudOS | CloudOS is a cloud platform that allows you to manage your cloud resources.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased dark`}>
        <ReduxProvider>
          <SessionProviderLayout>{children}</SessionProviderLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
