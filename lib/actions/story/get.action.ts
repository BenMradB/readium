"use server";

import { ServerActionResponse } from "@/lib/error";
import Story from "@/lib/models/story.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ServerActionResponseType } from "@/types/types";

export const getStoryById = async (
  storyId: string
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const story = await Story.findById(storyId).populate("author");
    if (!story) {
      return ServerActionResponse(404, "Story not found");
    }

    return ServerActionResponse(
      200,
      "Story fetcedh successfully",
      JSON.parse(JSON.stringify(story))
    );
  } catch (error: any) {
    return ServerActionResponse(500, "Internal Server Error");
  }
};
