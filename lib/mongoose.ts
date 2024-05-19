"use server";
import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) return console.error("No URL provided");
  console.log(
    process.env.MONGODB_URL!.replace(
      "<password>",
      process.env.MONGODB_PASSWORD!
    )
  );
  const URL =
    process.env.MONGODB_URL!.replace(
      "<password>",
      process.env.MONGODB_PASSWORD!
    ) ?? "";

  if (isConnected) return console.log("Already Connected");

  try {
    await mongoose.connect(URL, {
      dbName: process.env.DATABASE_NAME,
    });
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
