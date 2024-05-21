"use client";
import { Button } from "@/components/ui/button";
import { Braces, GripHorizontal, Image, Plus, Video } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const tools = [
  {
    description: "Add an image",
    Icon: Image,
    type: "image",
  },
  {
    description: "Add a video",
    Icon: Video,
    type: "video",
  },
  {
    description: "Add a code block",
    Icon: Braces,
    type: "code",
  },
  {
    description: "Add a divider",
    Icon: GripHorizontal,
    type: "divider",
  },
];

type Props = {};

const Tools = () => {
  return (
    <>
      {tools.map(({ description, Icon, type }, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 1.1, rotate: 90 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    duration: (index + 1) * 0.3,
                    ease: "easeInOut",
                  },
                }}
                className=" cursor-pointer border bg-transparent hover:bg-black/5  border-green-700 text-green-700 size-[35px] p-0 rounded-full flex items-center justify-center"
              >
                {type === "image" ? (
                  <div>
                    <label htmlFor="image" className="cursor-pointer">
                      <Icon size={20} className="text-green-700 " />
                    </label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ) : (
                  <Icon size={20} className="text-green-700" />
                )}
              </motion.div>
            </TooltipTrigger>
            <TooltipContent
              className="bg-black text-white font-thin tracking-wider text-sm"
              side="bottom"
            >
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
};

const NewStoryForm = (props: Props) => {
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const [isToolsOpen, setIsToolsOpen] = useState<boolean>(false);
  return (
    <div className="w-[80%] mx-auto relative mt-5">
      <div
        id="editable"
        ref={contentEditableRef}
        className="outline-none focus:outline-none editable w-full"
        contentEditable
        suppressContentEditableWarning
      >
        <div className="z-10 relative">
          <Popover onOpenChange={() => setIsToolsOpen((prev) => !prev)}>
            <PopoverTrigger asChild className="absolute top-10">
              <Button
                id="tooltip"
                className={cn(
                  "border bg-transparent hover:bg-black/5 border-gray-700 text-gray-700 size-[40px] p-0 rounded-full flex items-center justify-center"
                )}
              >
                <Plus
                  size={25}
                  className={cn(
                    "transition-all duration-300 ease-linear",
                    isToolsOpen ? "rotate-45" : ""
                  )}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 bg-transparent border-none shadow-none flex items-center gap-x-2"
              side="right"
            >
              <Tools />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NewStoryForm;
