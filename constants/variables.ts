import environment_configuration from '@/config/environment.config';
environment_configuration();

const PORT = process.env.PORT as string;
const NODE_ENV = process.env.NODE_ENV as string;
const ENV = process.env.ENV as string;

const variables = {
  PORT,
  NODE_ENV,
  ENV
}

export default variables;
