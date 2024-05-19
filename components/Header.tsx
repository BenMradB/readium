"use client";
import Image from "next/image";
import React from "react";
import { Tabs } from "./ui/tabs";
import ThemeSwitcher from "./ThemeSwitcher";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full p-4 flex items-center justify-between bg-glassy ">
      <div className="flex items-center gap-x-2">
        <Image
          src="/icons/logo.svg"
          alt="Medium Clone"
          width={40}
          height={40}
          className="dark:invert"
        />
        <h1 className="text-3xl md:text-4xl font-bold">Readium</h1>
      </div>
      <div className="flex items-center gap-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
