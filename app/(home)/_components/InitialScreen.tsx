"use client";
import Header from "@/components/Header";
import { usePageLoader } from "@/contexts/PageLoaderProvider";
import React, { ReactNode } from "react";

const InitialScreen = ({ children }: { children: ReactNode }) => {
  const { isLoading } = usePageLoader();
  return (
    <div className={isLoading ? "blur-sm" : ""}>
      <Header />
      {children}
    </div>
  );
};

export default InitialScreen;
