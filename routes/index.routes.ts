import admins from './admins.routes';
import consumers from './consumers.routes';
import express from 'express';
import users from './users.routes';
const router = express.Router();

export default () => {
  router.use('/admins', admins());
  router.use('/users', users());
  router.use('/consumers', consumers());
  return router;
}
