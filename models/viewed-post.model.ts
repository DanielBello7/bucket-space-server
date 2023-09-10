import VIEWED_POSTS from '@/interfaces/viewed-post.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ViewedPostSchema = new mongoose.Schema<VIEWED_POSTS>({
  postId: {
    type: String,
    ref: "posts",
    required: true
  },
  consumerId: {
    type: String,
    ref: "consumers",
    required: true
  }
}, { timestamps: true });

ViewedPostSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

ViewedPostSchema.plugin(paginate);
const ViewedPostModel = mongoose.model<VIEWED_POSTS, mongoose.PaginateModel<VIEWED_POSTS>>("viewed-posts", ViewedPostSchema);
export default ViewedPostModel;
