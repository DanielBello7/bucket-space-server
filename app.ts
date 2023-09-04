import express from 'express';
import { morganErrorHandler, morganSuccessHandler } from './config/morgan.config';

export default function serverApplication() {
  const app = express();
  app.use(morganErrorHandler);
  app.use(morganSuccessHandler);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.get('/', (req, res) => {
    return res.send('done');
  });
  return app;
}
