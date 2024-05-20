import { models, model, Schema, Document } from "mongoose";

interface IStory extends Document {
  content?: string;
  likes: Schema.Types.ObjectId[];
  dislikes: Schema.Types.ObjectId[];
  coverImage?: string;
  topics: string[];
  author: Schema.Types.ObjectId;
  publish?: boolean;
}

const StorySchema = new Schema<IStory>(
  {
    content: { type: String, required: false, default: "" },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: [],
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false,
        default: [],
      },
    ],
    coverImage: { type: String, required: false, default: "" },
    topics: [{ type: String, required: false, default: [] }],
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    publish: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const Story = models.Story || model("Story", StorySchema);

export default Story;
