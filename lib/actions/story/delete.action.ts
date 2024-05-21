"use server";

import { ServerActionResponse } from "@/lib/error";
import { connectToDatabase } from "@/lib/mongoose";
import { pullStoryFromUser } from "../user/toggle.stories.action";
import Story from "@/lib/models/story.model";
import { ServerActionResponseType } from "@/types/types";

export const deleteStory = async (
  storyId: string,
  author: string
): Promise<ServerActionResponseType> => {
  try {
    console.log("Deleting story with id: ", storyId, author);
    await connectToDatabase();

    const deletedStory = await Story.findByIdAndDelete(storyId, {
      new: true,
    });

    if (!deletedStory) {
      return ServerActionResponse(404, "Story not found.");
    }

    await pullStoryFromUser({
      storyId,
      userId: author,
    });

    return ServerActionResponse(
      200,
      "Story deleted successfully.",
      JSON.parse(JSON.stringify(deletedStory))
    );
  } catch (error: any) {
    return ServerActionResponse(
      500,
      "Something went wrong. Please try again later.",
      "Error: " + error.message
    );
  }
};
