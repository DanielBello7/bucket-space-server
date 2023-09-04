import { morganErrorHandler, morganSuccessHandler } from './config/morgan.config';
import { variables } from './constants';
import cors from 'cors';
import express from 'express';
import secret from './config/secret.config';
import session from 'express-session';
import compression from 'compression';
import handleIconError from './modules/handle-icon-error';

const whitelist: string[] = []

export default function serverApplication() {
  const app = express();

  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: variables.LIMIT }));
  app.use(express.urlencoded({ extended: true }));
  app.use(secret);
  app.use(handleIconError);
  app.use(session({
    secret: variables.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  }));
  app.get('/', (req, res) => {
    return res.send('done');
  });
  return app;
}
