export type TUser = {
  _id: string;
  clerkId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  followers: TUser[];
  following: TUser[];
  stories: TStory[];
};

export type TStory = {
  _id: string;
  content?: string;
  likes: TUser[];
  dislikes: TUser[];
  author: TUser;
  coverImage?: string;
  topics: string[];
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
};
