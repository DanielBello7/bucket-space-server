import { morganErrorHandler, morganSuccessHandler } from './config/morgan.config';
import { variables } from './constants';
import cors from 'cors';
import express from 'express';
import routes from './routes/index.route';
import secret from './config/secret.config';
import session from 'express-session';
import compression from 'compression';
import handleIconError from './middlewares/handle-icon-error';
import handleNotFoundError from './middlewares/not-found-error';
import convertError from './middlewares/convert-error';
import handleError from './middlewares/handle-error';
import documentation from './middlewares/documentation';
import initialize from './middlewares/passport';
import passport from 'passport';

function serverApplication() {
  const app = express();

  const whitelist: string[] = []

  initialize(passport);

  app.use(handleIconError);
  app.use(morganSuccessHandler);
  app.use(morganErrorHandler);
  app.use(cors({ origin: whitelist, credentials: true }));
  app.use(compression());
  app.use(express.json({ limit: variables.LIMIT }));
  app.use(express.urlencoded({ extended: true }));
  app.use(secret);

  app.use(session({
    secret: variables.EXPRESS_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      sameSite: 'lax',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/', documentation());
  app.get('/api/v1', routes());
  app.use(handleNotFoundError);
  app.use(convertError);
  app.use(handleError);

  return app;
}

export default serverApplication;
