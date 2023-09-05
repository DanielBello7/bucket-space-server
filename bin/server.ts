import 'module-alias/register';
import serverApplication from "../app";
import http from 'http';
import ip from 'ip';
import mongoose from 'mongoose';
import logger from '@/config/logger.config';
import ensureError from '@/modules/ensure-error';
import { variables } from '@/constants';

const app = serverApplication();
const server = http.createServer(app);
const port = variables.PORT || 3000;
const address = ip.address();

app.set('port', port);
app.set('host', address);

function onListening() {
  logger.info(`SERVER ACTIVE ON http://${address}:${port}/api/v1`);
}

function onError(error: any) {
  if (error.syscall !== 'listen')
    throw error;

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
}

function onMongooseError(error: unknown) {
  const err = ensureError(error);
  throw err;
}

function onMongooseOpen() {
  logger.info('CONNECTED TO DATABASE');
}

server.on('listening', onListening);
server.on('error', onError);
mongoose.set('strictQuery', true);
mongoose.connection.on('error', onMongooseError);
mongoose.connection.on('open', onMongooseOpen);
server.listen(port);