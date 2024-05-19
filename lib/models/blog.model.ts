import { models, model, Schema, Document } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  likes: Schema.Types.ObjectId[];
  dislikes: Schema.Types.ObjectId[];
  coverImage?: string;
  tags: string[];
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: [
    { type: Schema.Types.ObjectId, ref: "User", required: false, default: [] },
  ],
  dislikes: [
    { type: Schema.Types.ObjectId, ref: "User", required: false, default: [] },
  ],
  coverImage: { type: String, required: false, default: "" },
  tags: [{ type: String, required: false, default: [] }],
});

const Blog = models.Blog || model("Blog", BlogSchema);

export default Blog;
