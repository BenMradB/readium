"use client";
import { Button } from "@/components/ui/button";
import { Braces, GripHorizontal, Image, Plus, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MediumEditor from "medium-editor";

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
                className="z-50 cursor-pointer border bg-transparent hover:bg-black/5  border-green-700 text-green-700 size-[35px] p-0 rounded-full flex items-center justify-center"
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
  const [buttonToolsPosition, setButtonToolsPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const getCaretPosition = (event: KeyboardEvent) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      if (rect.top > 0) {
        setButtonToolsPosition({
          top: rect.top - 80, // use rect.bottom to align with the new line
          left: rect.left + window.scrollX,
        });
      }
    }
  };

  useEffect(() => {
    contentEditableRef.current?.addEventListener("keydown", getCaretPosition);
    return () => {
      contentEditableRef.current?.removeEventListener(
        "keydown",
        getCaretPosition
      );
    };
  }, []);

  useEffect(() => {
    if (typeof window.document !== "undefined") {
      const editor = new MediumEditor(".editable", {
        elementsContainer: document.getElementById("container") as HTMLElement,
        placeholder: false,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "underline",
            "anchor",
            "quote",
            "h1",
            "h2",
            "h3",
            "orderedlist",
            "unorderedlist",

            "removeFormat",
          ],
        },

        keyboardCommands: {
          commands: [
            {
              command: "bold",
              key: "B",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "italic",
              key: "I",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "underline",
              key: "U",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "h1",
              key: "1",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "h2",
              key: "2",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "h3",
              key: "3",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "quote",
              key: "'",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "orderedlist",
              key: "O",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "unorderedlist",
              key: "U",
              meta: true,
              shift: false,
              alt: false,
            },
            {
              command: "removeFormat",
              key: "R",
              meta: true,
              shift: false,
              alt: false,
            },
          ],
        },
      });

      return () => editor.destroy();
    }
  }, []);

  return (
    <div className="w-[80%]  mx-auto relative mt-14 md:mt-20">
      <Popover onOpenChange={() => setIsToolsOpen((prev) => !prev)}>
        <PopoverTrigger
          asChild
          className={cn("absolute left-0")}
          style={{
            top: buttonToolsPosition.top,
          }}
        >
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
          className="w-80  bg-transparent border-none shadow-none flex items-center gap-x-2"
          side="right"
        >
          <Tools />
        </PopoverContent>
      </Popover>
      <div
        id="editable"
        ref={contentEditableRef}
        className="prose outline-none focus:outline-none editable w-full pl-12"
        contentEditable
        suppressContentEditableWarning
        style={{
          whiteSpace: "pre-line",
        }}
      >
        <h1
          id="story-title"
          className="font-bold text-3xl md:text-5xl w-full"
          data-h1-placeholder="Title"
        ></h1>
        <p
          id="story-content"
          data-p-placeholder="Tell your story ..."
          className="font-normal text-lg md:text-xl pl-4"
        ></p>
      </div>
    </div>
  );
};

export default NewStoryForm;
