import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "A clone of Medium.com built with Next.js and Tailwind CSS. 🚀",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
