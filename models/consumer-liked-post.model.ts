import CONSUMER_LIKED_POSTS from '@/interfaces/consumer-liked-post.interface';
import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const ConsumerLikedPostSchema = new mongoose.Schema<CONSUMER_LIKED_POSTS>({
  consumerId: {
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

ConsumerLikedPostSchema.set("toJSON", {
  transform(_doc, ret) {
    delete ret.__v;
  },
});

ConsumerLikedPostSchema.plugin(paginate);
const ConsumerLikedPostModel = mongoose.model<CONSUMER_LIKED_POSTS, mongoose.PaginateModel<CONSUMER_LIKED_POSTS>>("consumer-liked-posts", ConsumerLikedPostSchema);
export default ConsumerLikedPostModel;
