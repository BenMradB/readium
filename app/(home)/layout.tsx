import Container from "@/components/Container";
import Header from "@/components/Header";
import { ReactNode } from "react";
import PageLoader from "./_components/PageLoader";
import { Metadata } from "next";
import InitialScreen from "./_components/InitialScreen";

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
      <InitialScreen>
        <Container>{children}</Container>
      </InitialScreen>
    </section>
  );
};

export default HomeLayout;
