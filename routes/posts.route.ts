import { check } from 'express-validator';
import express from 'express';
import PostController from '@/controllers/posts.controller';
import bodyValidate from '@/middlewares/body-validate';
const router = express.Router();

export default () => {
  const posts = new PostController();

  router.get('/',
    posts.getPosts);

  router.get('/:postId',
    posts.findPost);

  router.get('/:postId/comments/',
    posts.getPostComments);

  router.post('/:postId/like/',
    [
      check('consumerId').exists().isString()
    ],
    bodyValidate,
    posts.likePost);

  router.post('/:postId/comments/',
    [
      check('text').exists().isString(),
      check('createdBy').exists().isString()
    ],
    bodyValidate,
    posts.createPostComment);

  router.post('/:postId/viewed/',
    [
      check('consumerId').exists().isString()
    ],
    bodyValidate,
    posts.createPostView);

  router.post('/',
    [
      check('text').exists().isString(),
      check('createdBy').exists().isString()
    ],
    bodyValidate,
    posts.createPost);

  router.patch('/:postId/status/',
    posts.changePostStatus);

  router.delete('/:postId/dislike/',
    [
      check('consumerId').exists().isString()
    ],
    bodyValidate,
    posts.dislikePost);

  return router
}