import "./globals.css";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import { cn } from "@/lib/utils";
import { PageLoaderProvider } from "@/contexts/PageLoaderProvider";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Readium",
  description: "A clone of Medium.com built with Next.js and Tailwind CSS. 🚀",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          logoImageUrl: "/icons/logo.svg",
        },
      }}
    >
      <PageLoaderProvider>
        <html lang="en">
          <body className={cn("bg-white dark:bg-black", oswald.className)}>
            {/* <ThemeProvider attribute="class" defaultTheme="dark"> */}
            {children}
            <Toaster />

            {/* </ThemeProvider> */}
          </body>
        </html>
      </PageLoaderProvider>
    </ClerkProvider>
  );
}
