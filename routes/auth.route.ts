import { check } from 'express-validator';
import express from 'express';
import AuthController from '@/controllers/auth.controller';
import passport from 'passport';
import bodyValidate from '@/middlewares/body-validate';

const router = express.Router();

export default () => {
  const auth = new AuthController();

  router.post('/login/admin/',
    [
      check('email').exists().isEmail().isString(),
      check('password').exists().isString()
    ],
    bodyValidate,
    passport.authenticate("auth"),
    auth.adminLoginCallback);

  router.post('/login/consumer/',
    [
      check('email').exists().isEmail().isString(),
      check('password').exists().isString()
    ],
    bodyValidate,
    passport.authenticate("auth"),
    auth.consumerLoginCallback);

  router.post('/logout/',
    [
      check('email').exists().isString()
    ],
    bodyValidate,
    passport.authenticate("auth"),
    auth.logoutUser);

  router.get('/refresh/',
    passport.authenticate("refresh"),
    auth.refreshLoginCallback);

  return router;
}
