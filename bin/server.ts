import serverApplication from "../app";
import http from 'http';

const app = serverApplication();
const server = http.createServer(app);
const port = 3000;
app.set('port', port);

function onListening() {
  console.log('listening on port ' + port);
}

function onError(error: unknown) {
  console.log(error);
}

server.on('listening', onListening);
server.on('error', onError);
server.listen(port);