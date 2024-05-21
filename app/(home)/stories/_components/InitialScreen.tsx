"use client";
import { Button } from "@/components/ui/button";
import { usePageLoader } from "@/contexts/PageLoaderProvider";
import { getUserByClerkId } from "@/lib/actions/user/user.get.action";
import { TStory, TUser } from "@/types/models";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createStory } from "../../../../lib/actions/story/create.action";
import { CreateStoryParams } from "@/types/server.actions.params";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoryCard from "@/components/StoryCard";
import { deleteStory } from "@/lib/actions/story/delete.action";
import { Separator } from "@/components/ui/separator";

type Props = {};

const InitialScreen = (props: Props) => {
  const { setIsLoading } = usePageLoader();

  const router = useRouter();
  const { user } = useUser();
  const [mongoDbUser, setMongoDbUser] = useState<TUser | null>(null);

  const [draftsStories, setDraftsStories] = useState<TStory[]>([]);
  const [publishedStories, setPublishedStories] = useState<TStory[]>([]);
  const [responses, setResponses] = useState<TStory[]>([]);

  const onCreateNewStory = async () => {
    try {
      setIsLoading(true);
      const { statusCode, message, data } = await createStory({
        author: user!.id!,
      } as CreateStoryParams);

      if (statusCode !== 201) throw new Error(message);

      if (!data) throw new Error("Story not created, please try again.");

      setTimeout(() => {
        toast.success("Story created successfully.");
        router.push(`/new-story/${(data as TStory)._id}`);
      }, 1500);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const onDeleteStory = async (story: string, author: string, type: string) => {
    try {
      setIsLoading(true);
      const { statusCode, message, data } = await deleteStory(story, author);
      if (statusCode !== 200) throw new Error(message);
      if (!data) throw new Error("Story not deleted, please try again.");

      setTimeout(() => {
        if (type === "draft") {
          const newDrafts = draftsStories.filter(
            (draft) => draft._id !== story
          );
          setDraftsStories(newDrafts);
        } else {
          const newPublished = publishedStories.filter(
            (published) => published._id !== story
          );
          setPublishedStories(newPublished);
        }

        router.refresh();
        toast("Story deleted successfully");
      }, 1500);
    } catch (error: any) {
      toast("Error deleting story");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (!user) return;
    const loadUser = async () => {
      try {
        setIsLoading(true);
        const { statusCode, message, data } = await getUserByClerkId(user?.id!);
        if (statusCode !== 200) throw new Error(message);

        setMongoDbUser(data as TUser);

        const drafts = (data as TUser).stories.filter(
          (story) => !story.publish
        );
        const published = (data as TUser).stories.filter(
          (story) => story.publish
        );

        setDraftsStories(drafts);
        setPublishedStories(published);
      } catch (error: any) {
        toast(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [setIsLoading, user?.id, user]);

  return (
    <div className="w-full h-full flex gap-x-2 ">
      <div className="w-full flex-1  flex flex-col gap-y-5 pt-20 ">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-4xl md:text-6xl font-bold">Your stories</h2>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onCreateNewStory}
              className="flex items-center justify-center gap-x-2 rounded-full bg-green-700 hover:bg-green-700/95  text-white font-normal tracking-wider transition-all duration-300 ease-in-out"
            >
              <p>Write a Story</p>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="drafts" className="w-full bg-transparent">
          <TabsList className="grid grid-cols-3 gap-x-4 md:flex md:gap-x-8 bg-transparent border-b rounded-none border-black/5">
            <TabsTrigger
              value="drafts"
              className="flex items-center justify-center gap-x-2"
            >
              <p>Drafts</p>
              {draftsStories.length > 0 && (
                <span className="text-sm bg-black text-white size-[23px] rounded-full flex items-center justify-center">
                  {draftsStories.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
          </TabsList>
          <TabsContent value="drafts">
            {!draftsStories.length ? (
              <div className="tracking-wider w-full h-full flex flex-col items-center justify-center gap-y-4 py-10 text-center">
                <h3 className="text-2xl md:text-3xl font-extralight">
                  You have no drafts
                </h3>
                <p className="text-md md:text-lg font-thin">
                  <span
                    className="cursor-pointer font-normal underline underline-offset-1"
                    onClick={onCreateNewStory}
                  >
                    Write
                  </span>{" "}
                  a story or{" "}
                  <span
                    className="cursor-pointer font-normal underline underline-offset-1"
                    onClick={() => router.push("/")}
                  >
                    read
                  </span>{" "}
                  on Medium.
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-col">
                {draftsStories.map((story) => (
                  <div key={story._id}>
                    <StoryCard
                      story={story}
                      onDeleteStory={onDeleteStory}
                      type="draft"
                    />
                    <Separator className="bg-black/5" />
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="published">
            {!publishedStories.length ? (
              <div className="tracking-wider w-full h-full flex flex-col items-center justify-center gap-y-4 py-10 text-center">
                <h3 className="text-2xl md:text-3xl font-extralight">
                  You haven’t published any public stories yet.
                </h3>
              </div>
            ) : (
              <div></div>
            )}
          </TabsContent>
          <TabsContent value="responses">
            {!responses.length ? (
              <div className="tracking-wider w-full h-full flex flex-col items-center justify-center gap-y-4 py-10 text-center">
                <h3 className="text-2xl md:text-3xl font-extralight">
                  You haven’t published any public stories , so no responses
                  yet.
                </h3>
              </div>
            ) : (
              <div></div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="w-64  max-h-screen overflow-y-auto flex-col hidden lg:flex pt-24 px-4 border-l border-black/5">
        <h3 className="text-xl  font-normal ">Recommended Topics</h3>
      </div>
    </div>
  );
};

export default InitialScreen;
