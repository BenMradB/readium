export type TUser = {
  clerkId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  followers: TUser[];
  following: TUser[];
  blogs: TBlog[];
};

export type TBlog = {
  content?: string;
  likes: TUser[];
  dislikes: TUser[];
  coverImage?: string;
  topics: string[];
  publish: boolean;
};
