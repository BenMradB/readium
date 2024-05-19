import { models, model, Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  avatar: string;
  followers: Schema.Types.ObjectId[];
  following: Schema.Types.ObjectId[];
  blogs: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true },
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
  blogs: [
    { type: Schema.Types.ObjectId, ref: "Blog", required: false, default: [] },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
