"use server";

import { ServerActionResponse } from "@/lib/error";
import Story from "@/lib/models/story.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ServerActionResponseType } from "@/types/types";

export const saveStoryContent = async (
  storyId: string,
  content: string
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { content },
      { new: true }
    );

    if (!updatedStory) {
      return ServerActionResponse(404, "Story not found");
    }

    return ServerActionResponse(
      200,
      "Story content saved successfully",
      JSON.parse(JSON.stringify(updatedStory.content))
    );
  } catch (error: any) {
    console.log(error.message);
    return ServerActionResponse(500, "Internal Server Error");
  }
};
