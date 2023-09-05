import express from 'express';
import UsersController from '@/controllers/users.controller';
const router = express.Router();

export default () => {
  const users = new UsersController();
  router.get('/', users.getUsers);
  return router;
}