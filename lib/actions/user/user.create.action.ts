"use server";
import User from "@/lib/models/user.model";
import { ServerActionResponse } from "@/lib/error";
import { connectToDatabase } from "@/lib/mongoose";
import { RegisterParams } from "@/types/server.actions.params";
import { ServerActionResponseType } from "@/types/types";

export const register = async (
  params: RegisterParams
): Promise<ServerActionResponseType> => {
  try {
    await connectToDatabase();

    const newUser = await User.create(params);

    return ServerActionResponse(
      201,
      "User created successfully",
      JSON.parse(JSON.stringify(newUser))
    );
  } catch (error: any) {
    console.log("Error creating user: ", error);
    return ServerActionResponse(
      500,
      "Something went very wrong while creating your account , please try later on"
    );
  }
};
