import { TStory, TUser } from "./models";

export type ServerActionResponseType = {
  statusCode: number;
  message: string;
  data?: TUser | TStory;
};
