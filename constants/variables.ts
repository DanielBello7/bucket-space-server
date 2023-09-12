import environment_configuration from '@/config/environment.config';
environment_configuration();

const NODE_ENV = process.env.NODE_ENV as string;
const ENV = process.env.ENV as string;
const PORT = process.env.PORT as string;
const TYPE = process.env.TYPE as string;
const SALT = process.env.HASH as string;
const EXPIRES_IN = process.env.EXPIRES_IN as string;
const LIMIT = process.env.DATA_LIMIT as string;
const EXPRESS_SECRET = process.env.EXPRESS_SECRET as string;
const JWT_GENERAL_SECRET = process.env.JWT_GENERAL_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;
const MONGO_DB_URL = process.env.MONGO_DB_URL as string;
const SERVER_ADDRESS = process.env.SERVER_ADDRESS as string;
const APP_ADDRESS = process.env.APP_ADDRESS as string;
const ADMIN_ADDRESS = process.env.ADMIN_ADDRESS as string;
const HOME_ADDRESS = process.env.HOME_ADDRESS as string;
const DEV_SERVER_ADDRESS = process.env.DEV_SERVER_ADDRESS as string;
const LIVE_SERVER_ADDRESS = process.env.LIVE_SERVER_ADDRESS as string;

const variables = {
  NODE_ENV,
  ENV,
  PORT,
  TYPE,
  SALT,
  EXPIRES_IN,
  LIMIT,
  EXPRESS_SECRET,
  JWT_GENERAL_SECRET,
  JWT_REFRESH_SECRET,
  MONGO_DB_URL,
  SERVER_ADDRESS,
  APP_ADDRESS,
  ADMIN_ADDRESS,
  HOME_ADDRESS,
  DEV_SERVER_ADDRESS,
  LIVE_SERVER_ADDRESS
}

export default variables;
