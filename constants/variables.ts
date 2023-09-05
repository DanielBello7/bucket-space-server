import environment_configuration from '@/config/environment.config';
environment_configuration();

const PORT = process.env.PORT as string;
const NODE_ENV = process.env.NODE_ENV as string;
const ENV = process.env.ENV as string;
const LIMIT = process.env.LIMIT as string;
const SECRET = process.env.SECRET as string;
const SALT = process.env.SALT as string;

const variables = {
  PORT,
  NODE_ENV,
  ENV,
  LIMIT,
  SECRET,
  SALT
}

export default variables;
