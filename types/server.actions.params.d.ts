export type RegisterParams = {
  clerkId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
};

export type CreateStoryParams = {
  content?: string;
  coverImage?: string;
  topics?: string[];
};
