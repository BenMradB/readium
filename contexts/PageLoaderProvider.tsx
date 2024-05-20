"use client";
import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface PageLoaderContextValue {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const PageLoaderContext = createContext<PageLoaderContextValue | null>(null);

const PageLoaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PageLoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </PageLoaderContext.Provider>
  );
};

const usePageLoader = () => {
  const context = useContext(PageLoaderContext);

  if (!context) {
    throw new Error("usePageLoader must be used within a PageLoaderProvider");
  }

  return context;
};

export { PageLoaderProvider, usePageLoader };
