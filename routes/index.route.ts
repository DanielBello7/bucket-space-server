import admins from './admins.route';
import consumers from './consumers.route';
import express from 'express';
import users from './users.route';
import auth from './auth.route';
import posts from './posts.route';
import themes from './themes.route';
const router = express.Router();

export default () => {
  router.use('/admins', admins());
  router.use('/users', users());
  router.use('/consumers', consumers());
  router.use('/themes', themes());
  router.use('/auth', auth());
  router.use('/posts', posts());
  return router;
}
