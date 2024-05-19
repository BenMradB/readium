"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const ThemeSwitcher = () => {
  const onThemeChange = (theme: string) => {
    document.documentElement.setAttribute("class", theme);
  };
  return (
    <Tabs defaultValue="dark" className="w-fit h-fit ">
      <TabsList className="grid w-full grid-cols-2 dark:bg-zinc-950 bg-zinc-100  h-fit">
        <TabsTrigger
          value="dark"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-black"
          onClick={() => onThemeChange("dark")}
        >
          <MoonIcon className="w-4 h-4  text-white" />
        </TabsTrigger>
        <TabsTrigger
          value="light"
          className="data-[state=active]:bg-white dark:data-[state=active]:bg-black "
          onClick={() => onThemeChange("light")}
        >
          <SunIcon className="w-4 h-4 text-black dark:tex-white" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
