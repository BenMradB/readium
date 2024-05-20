import Container from "@/components/Container";
import Header from "@/components/Header";
import { ReactNode } from "react";
import PageLoader from "./_components/PageLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Readium",
  description: "A clone of Medium.com built with Next.js and Tailwind CSS. 🚀",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="flex flex-col  w-full min-h-screen">
      <PageLoader />
      <Header />
      <Container>{children}</Container>
    </section>
  );
};

export default HomeLayout;
