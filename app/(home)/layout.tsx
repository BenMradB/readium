import Container from "@/components/Container";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "A clone of Medium.com built with Next.js and Tailwind CSS. 🚀",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col w-full min-h-screen">
      <Header />
      <Container>{children}</Container>
    </section>
  );
};

export default HomeLayout;
