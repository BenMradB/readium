"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  LineChart,
  ListOrderedIcon,
  Minus,
  QuoteIcon,
  Redo,
  StrikethroughIcon,
  Undo,
  UndoDot,
  UndoDotIcon,
} from "lucide-react";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { ListBulletIcon } from "@radix-ui/react-icons";

const TipTapEditor = ({ content }: { content: string }) => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
      }),
    ],
    content,
  });

  if (!editor) return null;

  return (
    <div className="w-full h-full p-4">
      <div className="w-full flex items-center gap-x-0.5 border border-b-0 border-input rounded-t-sm">
        <Button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={cn(
            "bg-transparent rounded-none rounded-tl-sm hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor?.isActive("bold") && "text-white bg-black hover:bg-black/80"
          )}
        >
          <BoldIcon size={18} />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor?.isActive("italic") &&
              "text-white bg-black hover:bg-black/80"
          )}
        >
          <ItalicIcon size={18} />
        </Button>
        <Button
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor?.isActive("blockquote") &&
              "text-white bg-black hover:bg-black/80"
          )}
        >
          <QuoteIcon size={18} />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor.isActive("strike") && "text-white bg-black hover:bg-black/80"
          )}
        >
          <StrikethroughIcon size={18} />
        </Button>

        <div className="flex items-center gap-x-0.5 border border-input">
          {["h1", "h2", "h3", "h4", "h5", "h6"].map((heading, index) => (
            <Button
              key={index}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({
                    // @ts-ignore
                    level: index + 1,
                  })
                  .run()
              }
              className={cn(
                "bg-transparent rounded-none hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
                editor.isActive("heading", { level: index + 1 }) &&
                  "text-white bg-black hover:bg-black/80"
              )}
            >
              <p className="uppercase"> {heading} </p>
            </Button>
          ))}
        </div>

        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "bg-transparent rounded-none hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor.isActive("bulletList") &&
              "text-white bg-black hover:bg-black/80"
          )}
        >
          <ListBulletIcon className="size-[18px]" />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "bg-transparent rounded-none hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor.isActive("orderedList") &&
              "text-white bg-black hover:bg-black/80"
          )}
        >
          <ListOrderedIcon size={18} />
        </Button>

        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black",
            editor.isActive("code") && "text-white bg-black hover:bg-black/80"
          )}
        >
          <Code2Icon size={18} />
        </Button>

        <Button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black"
          )}
        >
          <Minus size={18} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black"
          )}
        >
          <UndoDotIcon size={18} />
        </Button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black"
          )}
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={cn(
            "bg-transparent rounded-none  hover:bg-input p-0 size-[30px] flex items-center justify-center text-black"
          )}
        >
          <Redo size={18} />
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border border-input rounded-b-sm outline-none focus-within:ring-0 focus-within:ring-offset-0 rounded-none p-4"
      />
    </div>
  );
};

export default TipTapEditor;
