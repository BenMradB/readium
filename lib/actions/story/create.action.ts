"use server";

import { CreateStoryParams } from "@/types/server.actions.params";
import Story from "@/lib/models/story.model";
import { ServerActionResponse } from "@/lib/error";
import { ServerActionResponseType } from "@/types/types";
import { connectToDatabase } from "@/lib/mongoose";
import { getUserByClerkId, getUserByMongoDbId } from "../user/user.get.action";
import { TUser } from "@/types/models";
import { pushStoryToUser } from "../user/toggle.stories.action";

export const createStory = async (
  params: CreateStoryParams
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const { data: user } = await getUserByClerkId(params.author);

    if (!user) {
      return ServerActionResponse(404, "Author not found");
    }

    const newStory = await Story.create({
      ...params,
      author: (user as TUser)._id,
    });

    await pushStoryToUser({
      userId: (user as TUser)._id,
      storyId: newStory._id,
    });

    return ServerActionResponse(
      201,
      "Story created",
      JSON.parse(JSON.stringify(newStory))
    );
  } catch (error: any) {
    console.log("createStory error : ", error);
    return ServerActionResponse(500, "Internal Server Error");
  }
};
