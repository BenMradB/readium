import { models, model, Schema, Document } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  stories: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    avatar: { type: String, required: false, default: "" },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",

        required: false,
        default: [],
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",

        required: false,
        default: [],
      },
    ],
    stories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Story",
        required: false,
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
