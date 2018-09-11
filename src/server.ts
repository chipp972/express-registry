import { Server } from 'http';

function getBind(server: Server) {
  const addr = server.address();
  return typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
}

/**
 * Handle server errors
 * @param {Server} server
 * @return {void}
 */
export function onError(server: Server) {
  return server.on('error', (err: any) => {
    if (err.syscall !== 'listen') {
      console.error(err.message);
      throw err;
    }

    const bind = getBind(server);
    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        console.error(err.message);
        throw err;
    }
  });
}

export const onExit = () => {
  console.info('Server is down');
  process.exit(0);
};

export const onListening = (server: Server) => () => {
  const bind = getBind(server);
  console.info(`Server Listening on ${bind}`);
  console.info(`Process pid is ${process.pid}`);
};
