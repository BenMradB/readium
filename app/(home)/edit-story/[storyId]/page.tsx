import React from "react";
import NewStoryForm from "./_components/NewStoryForm";
import { TStory } from "@/types/models";
import { getStoryById } from "@/lib/actions/story/get.action";

type Props = {
  params: {
    storyId: string;
  };
};

const NesStoryPage = async ({ params }: Props) => {
  let story: TStory = {} as TStory;

  try {
    const { statusCode, message, data } = await getStoryById(params.storyId);

    if (statusCode !== 200) throw new Error(message);

    story = data as TStory;
  } catch (error: any) {
    console.log(error);
  }
  return <NewStoryForm story={story} />;
};

export default NesStoryPage;
