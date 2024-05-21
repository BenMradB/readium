"use server";

import { ServerActionResponse } from "@/lib/error";
import Story from "@/lib/models/story.model";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { TUser } from "@/types/models";
import { ServerActionResponseType } from "@/types/types";

export const getUserByMongoDbId = async (
  mongoDbId: string
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const user = await User.findById(mongoDbId);

    if (!user) {
      return ServerActionResponse(404, "User not found.");
    }

    return ServerActionResponse(
      200,
      "User found.",
      JSON.parse(JSON.stringify(user))
    );
  } catch (error: any) {
    console.log("Error: ", error.message);
    return ServerActionResponse(
      500,
      "Something went wrong. Please try again later.",
      "Error: " + error.message
    );
  }
};

export const getUserByClerkId = async (
  clerkId: string
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();
    Story.find();

    const user = await User.findOne({ clerkId }).populate({
      path: "stories",
      model: "Story",
      populate: {
        path: "author",
        model: "User",
      },
    });

    if (!user) {
      return ServerActionResponse(404, "User not found.");
    }

    return ServerActionResponse(
      200,
      "User found.",

      JSON.parse(JSON.stringify(user))
    );
  } catch (error: any) {
    console.log("Error: ", error.message);
    return ServerActionResponse(
      500,
      "Something went wrong. Please try again later.",
      "Error: " + error.message
    );
  }
};
