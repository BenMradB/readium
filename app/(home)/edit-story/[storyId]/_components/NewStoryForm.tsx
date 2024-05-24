"use client";
import { Button } from "@/components/ui/button";
import { Check, CircleCheck, Loader2, Plus } from "lucide-react";
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
import { CodeBlock, Divider, ImageComponent, tools } from "./Tools";
import { toast } from "sonner";
import { saveStoryContent } from "@/lib/actions/story/save.action";
import { TStory } from "@/types/models";
import { useRouter } from "next/navigation";

const Tools = ({
  onFileChangeHandler,
  onAddDividerHandler,
  onAddCodeBlockHandler,
}: {
  onFileChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddDividerHandler: () => void;
  onAddCodeBlockHandler: () => void;
}) => {
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
                      onChange={onFileChangeHandler}
                    />
                  </div>
                ) : (
                  <Icon
                    size={20}
                    className="text-green-700"
                    onClick={() => {
                      if (type === "divider") {
                        onAddDividerHandler();
                      } else if (type === "code") {
                        onAddCodeBlockHandler();
                      } else {
                        console.log("Not implemented yet");
                      }
                    }}
                  />
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

type ToolStateType = {
  type: string;
  divider?: {
    id: string;
  };

  image?: {
    id: string;
    imageUrl: string;
    file: File;
  };
  blockOfCode?: {
    id: string;
    code: string;
    language: "javascript" | "python" | "java";
  };
  videos?: string;
};

type Props = {
  story: TStory;
};

const NewStoryForm = ({ story }: Props) => {
  const router = useRouter();
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const [addedTools, setAddedTools] = useState<ToolStateType[]>([]);

  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isToolsOpen, setIsToolsOpen] = useState<boolean>(false);
  const [buttonToolsPosition, setButtonToolsPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const onSaveContentHandler = async () => {
    try {
      setIsSaving(true);
      const content = contentEditableRef.current?.innerHTML;

      const { statusCode, message, data } = await saveStoryContent(
        story._id!,
        content || ""
      );

      if (statusCode !== 200) {
        throw new Error(message);
      }

      router.refresh();
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onFileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    let currentImageUrl = URL.createObjectURL(file);

    setAddedTools((prev: ToolStateType[]) => [
      ...prev,
      {
        type: "image",
        image: {
          id: crypto.randomUUID(),
          imageUrl: currentImageUrl,
          file,
        },
      },
    ]);
  };

  const onAddDividerHandler = () => {
    setAddedTools((prev: ToolStateType[]) => [
      ...prev,
      {
        type: "divider",
        divider: {
          id: crypto.randomUUID(),
        },
      },
    ]);
  };

  const onAddCodeBlockHandler = () => {
    setAddedTools((prev: ToolStateType[]) => [
      ...prev,
      {
        type: "code",
        blockOfCode: {
          id: crypto.randomUUID(),
          code: "",
          language: "javascript",
        },
      },
    ]);
  };

  const getCaretPosition = (): { top: number; left: number } => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();

      if (rect.top > 0) {
        setButtonToolsPosition({
          top: rect.top + window.scrollY - 100,
          left: rect.left + window.screenX,
        });
      }
      return {
        top: rect.top,
        left: rect.left + window.scrollX,
      };
    }

    return {
      top: 0,
      left: 0,
    };
  };

  useEffect(() => {
    const handleInput = () => {
      getCaretPosition();
      onSaveContentHandler();
    };
    contentEditableRef.current?.addEventListener("input", handleInput);
    return () => {
      contentEditableRef.current?.removeEventListener("input", handleInput);
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
    <div className="w-[99%] md:w-[80%]  mx-auto ">
      <div className="w-full  py-6 flex items-center justify-between">
        <div className="w-fit rounded-full flex items-center gap-x-1 text-gray-400 shadow-lg px-4 py-1">
          {isSaving ? (
            <>
              <span className="">saving</span>
              <Loader2 size={15} className="animate-spin" />
            </>
          ) : (
            <>
              <span className="">saved</span>
              <CircleCheck size={15} className="" />
            </>
          )}
        </div>
        <Button
          onClick={() => {}}
          className="flex items-center justify-center gap-x-2 rounded-full bg-green-700 hover:bg-green-700/95  text-white font-normal tracking-wider transition-all duration-300 ease-in-out"
        >
          <p>Publish Story</p>
        </Button>
      </div>
      <div className="w-full relative mt-14 md:mt-20">
        {buttonToolsPosition.top > 0 ? (
          <Popover
            open={isToolsOpen}
            onOpenChange={() => setIsToolsOpen((prev) => !prev)}
          >
            <PopoverTrigger
              asChild
              className={cn("absolute left-0")}
              style={{
                top: buttonToolsPosition.top - 145,
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
              className="w-fit  bg-white shadow-sm border p-1 rounded-full  flex items-center gap-x-2"
              side="right"
            >
              <Tools
                onFileChangeHandler={onFileChangeHandler}
                onAddDividerHandler={onAddDividerHandler}
                onAddCodeBlockHandler={onAddCodeBlockHandler}
              />
            </PopoverContent>
          </Popover>
        ) : null}
        <div
          id="editable"
          ref={contentEditableRef}
          className="prose !max-w-full outline-none focus:outline-none editable w-full pl-12"
          contentEditable
          suppressContentEditableWarning
          style={{
            whiteSpace: "pre-line",
          }}
        >
          {story && story.content ? (
            <div dangerouslySetInnerHTML={{ __html: story.content }}></div>
          ) : (
            <div>
              <h1
                id="story-title"
                className="font-bold text-xl md:text-3xl w-full"
                data-h1-placeholder="Title"
              ></h1>
              <div
                id="story-content"
                data-p-placeholder="Tell your story ..."
                className="font-normal text-lg md:text-xl "
              ></div>
            </div>
          )}
          {addedTools
            ? addedTools.map((tool, index) => (
                <div key={index}>
                  {tool.type === "image" ? (
                    <ImageComponent
                      imageUrl={tool.image?.imageUrl!}
                      file={tool.image?.file!}
                    />
                  ) : tool.type === "divider" ? (
                    <Divider />
                  ) : tool.type === "code" ? (
                    <CodeBlock
                      code={tool.blockOfCode?.code!}
                      language={tool.blockOfCode!.language!}
                    />
                  ) : (
                    "Other"
                  )}
                  <p
                    id="story-content"
                    data-p-placeholder="Complete your story ... "
                    className="font-normal text-lg md:text-xl "
                  ></p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default NewStoryForm;
