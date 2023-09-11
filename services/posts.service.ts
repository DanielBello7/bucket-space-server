import ConsumerLikedPostModel from "@/models/consumer-liked-post.model";
import CommentModel from "@/models/comment.model";
import PostModel from "@/models/post.model";
import POSTS from '@/interfaces/post.interface';
import ViewedPostModel from "@/models/viewed-post.model";
import APIError from "@/modules/api-error";
import { PaginateResult, PaginateOptions } from "mongoose";
import { COMMENTS } from "@/global";

class PostService {
  constructor() { }

  getPosts = async (): Promise<PaginateResult<POSTS>> => {
    const options: PaginateOptions = {
      populate: ["createdBy", "userId"]
    }
    const res = await PostModel.paginate({}, options);
    return res;
  }

  findPost = async (postId: string): Promise<POSTS> => {
    const post = await PostModel.findOne({ _id: postId });
    if (post) return post;
    throw new APIError(404, 'post unavailable');
  }

  getPostComments = async (postId: string): Promise<PaginateResult<COMMENTS>> => {
    const options: PaginateOptions = {}
    const res = await CommentModel.paginate({ postId }, options);
    return res;
  }

  createLike = async (consumerId: string, postId: string) => {
    var postConfirm = await PostModel.findOne({ _id: postId });
    if (!postConfirm) {
      throw new APIError(400, 'post unavailable');
    }
    if (await ConsumerLikedPostModel.findOne({ consumerId, postId })) return
    await new ConsumerLikedPostModel({ consumerId, postId }).save();
    await PostModel.updateOne({ _id: postId }, { $inc: { likes: 1 } })
  }

  dislikePost = async (consumerId: string, postId: string) => {
    var postConfirm = await PostModel.findOne({ _id: postId });
    if (!postConfirm) {
      throw new APIError(400, 'post unavailable');
    }
    const selected = await ConsumerLikedPostModel.findOne({ consumerId, postId });
    if (!selected) return
    await ConsumerLikedPostModel.deleteOne({ _id: selected._id });
    await PostModel.updateOne({ _id: postId }, { $inc: { likes: -1 } });
  }

  createComment = async (data: Partial<COMMENTS>): Promise<COMMENTS> => {
    const post = await PostModel.findOne({ _id: data.postId });
    if (!post) {
      throw new APIError(400, 'post unavailable');
    }
    const comment = await new CommentModel({ ...data }).save();
    await PostModel.updateOne({ _id: data.postId }, { $inc: { comments: 1 } })
    return comment;
  }

  createViewRecord = async (consumerId: string, postId: string): Promise<POSTS> => {
    const post = await PostModel.findOne({ _id: postId }).populate(["createdBy", "userId"]);
    if (!post) throw new APIError(404, 'post unavailable');
    await new ViewedPostModel({ consumerId, postId }).save();
    return post;
  }

  createPost = async (data: Partial<POSTS>): Promise<POSTS> => {
    const post = await new PostModel({ ...data }).save();
    return post;
  }

  updatePost = async (postId: string, data: Partial<POSTS>): Promise<POSTS> => {
    const post = await PostModel.findOne({ _id: postId });
    if (!post) throw new APIError(404, 'post unavailable');
    await PostModel.updateOne({ _id: postId }, { $set: { ...data } });
    const res = await PostModel.findOne({ _id: postId });
    if (res) return res;
    throw new APIError(500, 'error updating post');
  }
}

export default PostService;
