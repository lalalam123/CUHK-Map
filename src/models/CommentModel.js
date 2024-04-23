import { Schema, model, models } from "mongoose";

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
});

const CommentModel = models.Comment || model("Comment", commentSchema);

export default CommentModel;
