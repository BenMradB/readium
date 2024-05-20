"use client";
import Image from "next/image";
import { SignedIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Skeleton } from "./ui/skeleton";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { createStory } from "@/lib/actions/story/create.action";
import { CreateStoryParams } from "@/types/server.actions.params";
import Loader from "./Loader";
import { usePageLoader } from "@/contexts/PageLoaderProvider";

const Header = () => {
  const router = useRouter();
  const { user } = useUser();
  const { isLoading, setIsLoading } = usePageLoader();

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const onCreateNewStory = async () => {
    try {
      setIsLoading(true);
      const { statusCode, message, data } = await createStory(
        {} as CreateStoryParams
      );

      if (statusCode !== 201) throw new Error(message);

      if (!data) throw new Error("Story not created, please try again.");

      toast.success("Story created successfully.");

      router.push(`/new-story/${data.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setOpenDialog((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="w-full p-4 flex items-center justify-between bg-glassy gap-x-5">
      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent className="w-[95%] md:w-[85%] lg:w-[90%] mx-auto rounded-md">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
      <Link href={"/"} className="flex items-center gap-x-2">
        <Image
          src="/icons/logo.svg"
          alt="Medium Clone"
          width={40}
          height={40}
          className="dark:invert"
        />
        <h1 className="text-3xl md:text-4xl font-bold hidden md:block">
          Readium
        </h1>
      </Link>

      <div
        onClick={() => setOpenDialog((prev) => !prev)}
        className="cursor-pointer flex-1 lg:w-[500px] border !border-input lg:flex-none  bg-glassy rounded-sm relative h-[40px]"
      >
        <Image
          src={"/icons/search.svg"}
          alt={"search"}
          width={20}
          height={20}
          className="absolute top-1/2 transform -translate-y-1/2 left-2"
        />
        <Input
          className="cursor-pointer w-full h-full rounded-none bg-slate-transparent pl-10 pr-2 font-normal border-none outline-none "
          placeholder="Search stories, authors, topics"
          readOnly
        />

        <Badge className="px-1.5 py-0.5 w-fit h-fit bg-black/5 rounded-sm absolute top-1/2 right-2  -translate-y-1/2  text-black shadow-lg hover:bg-black/5 cursor-pointer">
          ⌘ k
        </Badge>
      </div>

      <div className="flex items-center gap-x-5" onClick={onCreateNewStory}>
        <Link
          href={"/new-story"}
          className="hidden md:flex items-center gap-x-1 group"
        >
          <Image
            src={"/icons/write.svg"}
            alt={"write"}
            width={20}
            height={20}
            className=""
          />
          <span className="group-hover:opacity-80">Write</span>
        </Link>
        <Link
          href={"/notifications"}
          className="hidden md:flex items-center gap-x-1"
        >
          <Image
            src={"/icons/notification.svg"}
            alt={"write"}
            width={24}
            height={24}
            className=""
          />
        </Link>

        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="size-[35px]">
                <AvatarImage
                  src={user?.imageUrl!}
                  alt={"avatar"}
                  className="cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                />
                <AvatarFallback>
                  <Skeleton className="w-full h-full rounded-full bg-slate-300 " />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup className="md:hidden">
                <DropdownMenuItem onClick={onCreateNewStory}>
                  Write
                  <DropdownMenuShortcut>
                    <Image
                      src={"/icons/write.svg"}
                      alt={"write"}
                      width={20}
                      height={20}
                      className=""
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => router.push(`/profile/${user!.id}`)}
                >
                  Profile
                  <DropdownMenuShortcut>
                    <Image
                      src={"/icons/profile.svg"}
                      alt={"profile"}
                      width={20}
                      height={20}
                      className=""
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="md:hidden"
                  onClick={() => router.push("/notifications")}
                >
                  Notifications
                  <DropdownMenuShortcut>
                    <Image
                      src={"/icons/notification.svg"}
                      alt={"write"}
                      width={20}
                      height={20}
                      className=""
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => router.push("/stories")}>
                  Stories
                  <DropdownMenuShortcut>
                    <Image
                      src={"/icons/stories.svg"}
                      alt={"stories"}
                      width={20}
                      height={20}
                      className=""
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  Settings
                  <DropdownMenuShortcut>
                    <Image
                      src={"/icons/settings.svg"}
                      alt={"settings"}
                      width={20}
                      height={20}
                      className=""
                    />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                Sign Out
                <DropdownMenuShortcut>
                  <Image
                    src={"/icons/signout.svg"}
                    alt={"logout"}
                    width={20}
                    height={20}
                    className=""
                  />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
