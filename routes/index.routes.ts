import admins from './admins.routes';
import express from 'express';
import users from './users.routes';
const router = express.Router();

export default () => {
  router.use('/admins', admins());
  router.use('/users', users());
  return router
}