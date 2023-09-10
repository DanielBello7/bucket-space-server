import POSTS from '@/interfaces/post.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const PostSchema = new mongoose.Schema<POSTS>({
  text: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
  themes: [{
    type: String,
    ref: "themes",
    default: []
  }],
  createdBy: {
    type: String,
    ref: "consumers",
    required: true
  }
}, { timestamps: true });

PostSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

PostSchema.plugin(paginate);
const PostModel = mongoose.model<POSTS, mongoose.PaginateModel<POSTS>>("posts", PostSchema);
export default PostModel;
