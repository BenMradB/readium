"use client";
import { uploadToCloudinary } from "@/lib/actions/cloudinary/cloudinary.action";
import {
  Braces,
  Clipboard,
  ClipboardCheck,
  ClipboardPaste,
  GripHorizontal,
  LucideImage,
  MoreHorizontal,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const tools = [
  {
    description: "Add an image",
    Icon: LucideImage,
    type: "image",
  },

  {
    description: "Add a code block",
    Icon: Braces,
    type: "code",
  },
  {
    description: "Add a divider",
    Icon: MoreHorizontal,
    type: "divider",
  },
];

export const ImageComponent = ({
  imageUrl,
  file,
}: {
  imageUrl: string;
  file: File;
}) => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string>(imageUrl);

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const url = await uploadToCloudinary(formData);

      setCurrentImageUrl(url);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    uploadImage();
  }, [imageUrl, file.name]);
  return (
    <div className="w-full ">
      <div className="w-full h-full  flex flex-col items-center justify-center">
        <Image
          src={currentImageUrl}
          alt={file.name}
          width={300}
          height={300}
          className="w-full h-[400px] object-cover rounded-lg"
        />
        <p
          id="story-content"
          data-p-placeholder="Type caption for image ... "
          className="font-normal text-md md:text-md "
        ></p>
      </div>
      <p
        id="story-content"
        data-p-placeholder="Complete your story ... "
        className="font-normal text-lg md:text-xl "
      ></p>
    </div>
  );
};

export const Divider = () => {
  return (
    <div className="w-full">
      <div
        className="w-[10%] mx-auto  flex items-center justify-center my-8"
        contentEditable={false}
      >
        <div className="w-full flex items-center justify-evenly text-gray-600">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className="size-[5px] rounded-full bg-gray-600"
            ></span>
          ))}
        </div>
      </div>

      <p
        id="story-content"
        data-p-placeholder="Complete your story ... "
        className="font-normal text-lg md:text-xl "
      ></p>
    </div>
  );
};

export const CodeBlock = ({
  code,
  language,
}: {
  code: string;
  language: "javascript" | "python" | "java";
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<
    "javascript" | "python" | "java"
  >(language);
  const [currentCode, setCurrentCode] = useState<string>("");
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentLanguage(e.target.value as "javascript" | "python" | "java");
  };

  const onChangeCodeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    setCurrentCode(e.target.value);
  };

  const onPasteHandler = async () => {
    try {
      const data = await navigator.clipboard.readText();

      setCurrentCode((prev) => prev + data);
    } catch (error: any) {
      toast.error("Something went wrong ...");
    }
  };

  useEffect(() => {
    const highlighted = hljs.highlight(currentCode, {
      language: currentLanguage,
      ignoreIllegals: true,
    }).value;

    setHighlightedCode(highlighted);
  }, [currentCode, currentLanguage]);

  return (
    <div className="w-full mt-4 flex flex-col gap-y-4">
      <div
        contentEditable={false}
        className="w-full relative shadow-lg  focus-within:ring-0 focus-within:ring-offset-0  bg-gray-100 border rounded-md rounded-tr-none p-5 focus:outline-none"
      >
        <div
          onClick={onPasteHandler}
          className="size-[40px] rounded-t-md bg-gray-100 border flex items-center justify-center absolute -top-[41px] -right-[0.5px] cursor-pointer border-b-0"
        >
          <ClipboardPaste className="text-black" size={20} />
        </div>
        <div className="w-full flex flex-col gap-y-4">
          <select
            onChange={onChangeLanguage}
            contentEditable={false}
            className={cn(
              "bg-transparent w-fit px-1 py-0.5  rounded-md focus-within:ring-0 focus-within:ring-offset-0 focus:outline-none"
            )}
          >
            <option
              value="javascript"
              className="bg-transparent hover:bg-gray-200 p-2 text-md font-normal"
            >
              Javascript
            </option>
            <option
              value="python"
              className="hover:bg-gray-200 p-2 text-md font-normal"
            >
              Python
            </option>
            <option
              value="java"
              className="hover:bg-gray-200 p-2 text-md font-normal"
            >
              Java
            </option>
          </select>

          <textarea
            contentEditable={false}
            placeholder="Paste your code here ..."
            className="bg-white rounded-md border max-h-[200px] overflow-y-auto p-2 focus-within:ring-0 focus-within:ring-offset-0 focus:outline-none"
            onChange={onChangeCodeHandler}
          >
            {currentCode}
          </textarea>
          <div
            id="story-content"
            data-p-placeholder="Code will be shown here ..."
            contentEditable={false}
            className={cn(
              "bg-white rounded-md border max-h-[200px] overflow-y-auto p-2 focus-within:ring-0 focus-within:ring-offset-0 focus:outline-none"
            )}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{
              whiteSpace: "pre-wrap",
            }}
          ></div>
        </div>
      </div>
      <p
        id="story-content"
        data-p-placeholder="Complete your story ... "
        className="font-normal text-lg md:text-xl "
      ></p>
    </div>
  );
};
