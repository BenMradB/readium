"use client";
import { usePageLoader } from "@/contexts/PageLoaderProvider";
import React from "react";
import Loader from "@/components/Loader";

const PageLoader = () => {
  const { isLoading } = usePageLoader();
  return isLoading ? <Loader /> : null;
};

export default PageLoader;
