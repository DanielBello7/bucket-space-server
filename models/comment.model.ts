import COMMENTS from '@/interfaces/comment.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const CommentSchema = new mongoose.Schema<COMMENTS>({
  text: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true,
    ref: "consumers"
  },
  postId: {
    type: String,
    required: true,
    ref: "posts"
  }
}, { timestamps: true });

CommentSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

CommentSchema.plugin(paginate);
const CommentModel = mongoose.model<COMMENTS, mongoose.PaginateModel<COMMENTS>>("comments", CommentSchema);
export default CommentModel;
