import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "API Docummentation | Simply Boring",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const existingUser = await getCurrentUser();

  if (!existingUser) {
    redirect("/sign-in");
  }
  return (
    <div className="max-w-7xl mx-auto p-0 m-0">
      <Navbar />
      {children}
    </div>
  );
}
