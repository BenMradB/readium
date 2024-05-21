"use server";

import { ServerActionResponse } from "@/lib/error";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { ServerActionResponseType } from "@/types/types";

export const deleteUserByClerkId = async (
  clerkId: string
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const deletedUser = await User.findOneAndDelete({ clerkId });

    if (!deletedUser) {
      return ServerActionResponse(404, "User not found");
    }

    return ServerActionResponse(
      200,
      "User deleted successfully",
      JSON.parse(JSON.stringify(deletedUser))
    );
  } catch (error: any) {
    return ServerActionResponse(
      500,
      "Something went very wrong while deleting your account , please try later on"
    );
  }
};
