import { COMMENTS, POSTS, _NextFunction, _Request, _Response } from "@/global";
import PostService from "@/services/posts.service";

class PostController {
  private postService: PostService;

  constructor() {
    this.postService = new PostService();
  }

  getPosts = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const response = await this.postService.getPosts();
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  findPost = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const response = await this.postService.findPost(postId);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  getPostComments = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const response = await this.postService.getPostComments(postId);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  likePost = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const consumerId = req.body.consumerId;
      await this.postService.createLike(consumerId, postId);
      res.json({ status: "OK", msg: "success", payload: null })
    } catch (error) { next(error) }
  }

  createPostComment = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const body = req.body;

      const data: Partial<COMMENTS> = {
        createdBy: body.createdBy,
        postId: postId,
        text: body.text
      }

      const response = await this.postService.createComment(data);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  createPostView = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const consumerId = req.body.consumerId;
      const postId = req.params.postId;
      var response = await this.postService.createViewRecord(consumerId, postId);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  // kinda done
  createPost = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const body = req.body;

      const data: Partial<POSTS> = {
        createdBy: body.createdBy,
        text: body.text,
        themes: []
      }
      const response = await this.postService.createPost(data);
      res.json({ status: "OK", msg: "post created", payload: response });
    } catch (error) { next(error) }
  }

  changePostStatus = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const data = {
        isBlocked: req.body.isBlocked
      }

      Object.keys(data).forEach((item) => {
        var selected = data[item as keyof typeof data];
        if (selected === undefined) delete data[item as keyof typeof data];
      });

      const response = await this.postService.updatePost(postId, data);
      res.json({ status: "OK", msg: "success", payload: response });
    } catch (error) { next(error) }
  }

  dislikePost = async (req: _Request, res: _Response, next: _NextFunction) => {
    try {
      const postId = req.params.postId;
      const consumerId = req.body.consumerId;
      await this.postService.dislikePost(consumerId, postId);
      res.json({ status: "OK", msg: "success", payload: null })
    } catch (error) { next(error) }
  }
}

export default PostController;
