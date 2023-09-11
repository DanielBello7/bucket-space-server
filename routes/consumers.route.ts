import ConsumersController from '@/controllers/consumers.controller';
import bodyValidate from '@/middlewares/body-validate';
import express from 'express';
import { check } from 'express-validator';
const router = express.Router();

export default () => {
  const consumer = new ConsumersController();

  router.get('/',
    consumer.getConsumers);

  router.get('/:consumerId/',
    consumer.findConsumer);

  router.get('/:consumerId/themes/',
    consumer.getConsumerThemes);

  router.get('/:consumerId/feed/',
    consumer.getConsumerFeed);

  router.post('/',
    [
      check('name').exists().isString(),
      check('username').exists().isString(),
      check('email').exists().isString(),
      check('password').exists().isString(),
      check('avatar').exists().isString(),
      check('bio').exists().isString()
    ],
    bodyValidate,
    consumer.createConsumer);

  router.post('/:consumerId/themes/',
    [
      check('themes').exists().isArray()
    ],
    bodyValidate,
    consumer.addConsumerTheme);

  router.patch('/:consumerId/',
    consumer.updateConsumer);

  router.delete('/:consumerId/',
    consumer.removeConsumerTheme);

  return router;
}
