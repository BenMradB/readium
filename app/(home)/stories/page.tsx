import React from "react";
import InitialStoriesScreen from "./_components/InitialScreen";
import { redirect } from "next/navigation";
import { TUser } from "@/types/models";
import { getUserByClerkId } from "@/lib/actions/user/user.get.action";
import { auth, currentUser } from "@clerk/nextjs/server";

const StoriesPage = async () => {
  const { userId } = auth();

  if (!userId) return redirect("/sign-in");

  let user: TUser = {} as TUser;

  try {
    const { statusCode, message, data } = await getUserByClerkId(userId);

    if (statusCode !== 200) throw new Error(message);

    user = data as TUser;
  } catch (error: any) {
    console.error(error);
  }

  return <InitialStoriesScreen user={user} />;
};

export default StoriesPage;
