import { check } from 'express-validator';
import RecoveryController from '@/controllers/recovery.controller';
import express from 'express';
import bodyValidate from '@/middlewares/body-validate';

const router = express.Router();

export default () => {
  const recovery = new RecoveryController();

  router.get('/verify/:email/',
    recovery.verifyUser);

  router.post('/otp',
    [
      check('otp').exists().isString(),
      check('email').exists().isString().isEmail()
    ],
    bodyValidate,
    recovery.sentOTP);

  router.patch('/password/',
    [
      check('email').exists().isString().isEmail(),
      check('newPassword').exists().isString()
    ],
    bodyValidate,
    recovery.updateUserPassword);

  return router;
}
