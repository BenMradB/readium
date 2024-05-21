"use server";

import { ServerActionResponse } from "@/lib/error";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ToggleStoriesParams } from "@/types/server.actions.params";

export const pushStoryToUser = async (params: ToggleStoriesParams) => {
  try {
    await connectToDatabase();

    await User.findByIdAndUpdate(params.userId, {
      $push: { stories: params.storyId },
    });
  } catch (error: any) {
    return ServerActionResponse(
      500,
      "Something went very wrong while pushing story to user , please try later on"
    );
  }
};

export const pullStoryFromUser = async (params: ToggleStoriesParams) => {
  try {
    await connectToDatabase();

    await User.findByIdAndUpdate(params.userId, {
      $pull: { stories: params.storyId },
    });
  } catch (error: any) {
    return ServerActionResponse(
      500,
      "Something went very wrong while pulling story from user , please try later on"
    );
  }
};
