export type TUser = {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  avatar: string;
  followers: TUser[];
  following: TUser[];
  blogs: TBlog[];
};

export type TBlog = {
  title: string;
  content: string;
  likes: TUser[];
  dislikes: TUser[];
  coverImage?: string;
  tags: string[];
};
