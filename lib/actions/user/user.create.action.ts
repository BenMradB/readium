"use server";
import { ServerActionResponse } from "@/lib/error";
import User from "@/lib/models/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { RegisterParams } from "@/types/server.actions.params";

export const register = async (params: RegisterParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(params);

    ServerActionResponse(201, "User created successfully", newUser);
  } catch (error: any) {
    console.log("Error creating user: ", error);
    ServerActionResponse(
      500,
      "Something went very wrong while creating your account , please try later on"
    );
  }
};
