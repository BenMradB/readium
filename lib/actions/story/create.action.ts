"use server";

import { CreateStoryParams } from "@/types/server.actions.params";
import Story from "@/lib/models/story.model";
import { ServerActionResponse } from "@/lib/error";
import { ServerActionResponseType } from "@/types/types";

export const createStory = async (
  params: CreateStoryParams
): Promise<ServerActionResponseType> => {
  try {
    const newStory = await Story.create(params);

    return ServerActionResponse(201, "Story created", newStory);
  } catch (error: any) {
    console.log("createStory error : ", error);
    return ServerActionResponse(500, "Internal Server Error");
  }
};
