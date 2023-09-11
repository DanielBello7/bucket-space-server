import admins from './admins.route';
import consumers from './consumers.route';
import express from 'express';
import users from './users.route';
const router = express.Router();

export default () => {
  router.use('/admins', admins());
  router.use('/users', users());
  router.use('/consumers', consumers());
  return router;
}
