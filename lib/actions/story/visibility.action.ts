"use server";

import { ServerActionResponse } from "@/lib/error";
import Story from "@/lib/models/story.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ServerActionResponseType } from "@/types/types";
import { getStoryById } from "./get.action";
import { TStory } from "@/types/models";

export const toggleVisibility = async (
  storyId: string,
  currentLoggedInUser: string,
  topics: string[]
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const { statusCode, message, data } = await getStoryById(storyId);

    if (statusCode !== 200) {
      return ServerActionResponse(statusCode, message);
    }

    const story = data as TStory;

    if (story.author._id !== currentLoggedInUser) {
      return ServerActionResponse(
        403,
        "You are not authorized to perform this action."
      );
    }

    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      {
        publish: !story.publish,
        topics: topics,
      },
      { new: true }
    );

    return ServerActionResponse(
      200,
      `Story visibility toggled successfully`,
      JSON.parse(JSON.stringify(updatedStory))
    );
  } catch (error: any) {
    return ServerActionResponse(
      500,
      "Something went wrong while toggling visibility of the story. Please try again later."
    );
  }
};
