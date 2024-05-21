"use client";
import { TStory } from "@/types/models";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PenLineIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

type Props = {
  story: TStory;
  type: "draft" | "published";
  onDeleteStory: (story: string, author: string, type: string) => void;
};

const StoryCard = ({ story, type, onDeleteStory }: Props) => {
  const router = useRouter();

  return (
    <div className="w-full h-[100px] py-4 flex flex-col justify-between">
      <div className="w-full flex items-center justify-between">
        <Link
          href={`/edit-story/${story._id}`}
          className="text-lg md:text-xl font-bold"
        >
          {story.content || "Untitled Story"}
        </Link>

        <div className="flex items-center">
          <Button
            onClick={() => router.push(`/edit-story/${story._id}`)}
            className="group bg-transparent hover:bg-transparent size-[20px] flex-center"
          >
            <PenLineIcon
              size={15}
              className="flex-shrink-0 group-hover:text-black/80 transition-all duration-300 ease-in-out"
            />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="group bg-transparent hover:bg-transparent size-[20px] flex-center">
                <Trash2Icon
                  size={15}
                  className="flex-shrink-0 text-red-600 group-hover:text-red-700 transition-all duration-300 ease-in-out"
                />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[90%] mx-auto rounded-sm ">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your story
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="bg-black/10">
                <AlertDialogCancel className="">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    onDeleteStory(story._id, story.author._id, type)
                  }
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Delete Anyway
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <p className="text-sm md:text-md font-normal text-gray-500">
        {timeAgo(story.createdAt) === "just now"
          ? "Created just now"
          : `Created about ${timeAgo(story.createdAt)} ago`}
      </p>
    </div>
  );
};

export default StoryCard;
