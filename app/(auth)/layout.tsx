import { getCurrentUser } from "@/lib/actions/user.actions";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "API Docummentation | Auth",
  description: "Generated by create next app",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const existingUser = await getCurrentUser();

  if (existingUser) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2">Auth Layout</div>
      <div className="flex flex-1 flex-col justify-center items-center p-4 gap-4">
        {children}
      </div>
    </div>
  );
}
