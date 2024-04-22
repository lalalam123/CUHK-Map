import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = models.Post || model("Post", postSchema);

export default postSchema;
