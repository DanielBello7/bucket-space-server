import 'module-alias/register';
import serverApplication from "../app";
import http from 'http';
import logger from '@/config/logger.config';
import { variables } from '@/constants';

const app = serverApplication();
const server = http.createServer(app);
const port = variables.PORT || 3000;
app.set('port', port);

function onListening() {
  logger.info('listening on port ' + port);
}

function onError(error: unknown) {
  logger.error(error);
}

server.on('listening', onListening);
server.on('error', onError);
server.listen(port);