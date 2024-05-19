"use server";

import { Error } from "@/lib/error";
import { connectToDatabase } from "@/lib/mongoose";
import { RegisterParams } from "@/types/server.actions.params";

export const register = async (params: RegisterParams) => {
  try {
    await connectToDatabase();

    console.log("Creating user with params: ", params);
  } catch (error: any) {
    console.log("Error creating user: ", error);
    Error(
      500,
      "Something went very wrong while creating your account , please try later on"
    );
  }
};
