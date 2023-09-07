import UsersController from '@/controllers/users.controller';
import bodyValidate from '@/middlewares/body-validate';
import express from 'express';
import { check } from 'express-validator';

const router = express.Router();

export default () => {
  const users = new UsersController();
  router.patch('/:userId/password/',
    [
      check('oldPassword').exists().isString(),
      check('newPassword').exists().isString(),
    ],
    bodyValidate,
    users.updateUserPassword);

  return router;
}