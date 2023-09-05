import { morganErrorHandler, morganSuccessHandler } from './config/morgan.config';
import { variables } from './constants';
import cors from 'cors';
import express from 'express';
import secret from './config/secret.config';
import session from 'express-session';
import compression from 'compression';
import handleIconError from './middlewares/handle-icon-error';
import handleNotFoundError from './middlewares/not-found-error';
import convertError from './middlewares/convert-error';
import handleError from './middlewares/handle-error';
import documentation from './middlewares/documentation';

function serverApplication() {
  const app = express();

  const whitelist: string[] = []

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

  app.use('/', documentation());
  app.get('/api/v1', (req, res) => res.send('done'));
  app.use(handleNotFoundError);
  app.use(convertError);
  app.use(handleError);

  return app;
}

export default serverApplication;
