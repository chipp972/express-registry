# express-registry

## Usage

```bash
npm i -S express-registry
```

## Description

Express-based mini-framework that let you focus on your application components
and avoid express boilerplates.
You register your config, librairies and utils in a global singleton registry.
Then you can register your middlewares and routes.
If you need to make components share informations or communicate, you can use
the registry which is an event-emitter.

## Example

```javascript
// index.ts

import { getExpressRegistry } from 'express-registry';
import getConfig from './config';
import getLib from './lib';
import getServices from './service';
import getMiddlewares from './middlewares';
import getRoutes from './routes';

(async () => {
  try {
    const config = await getConfig();
    const registry = getExpressRegistry(config.env.port);

    registry.on('error', (err: Error) => console.log('Runtime error', err));

    registry
      .addConfig(config)
      .addLib(await getLib())
      .addServices(await getServices())
      .addMiddlewares(await getMiddlewares())
      .addRoutes(await getRoutes())
      .startServer();
  } catch (err) {
    console.log('Uncaught error at init', err);
  }
})();
```

## Config

```javascript
// config/index.js
const env = {
  port: process.env.PORT || 5000
}

export env;
```

You should put env and all config required to make your app run

## Lib

All helpers like logger, mailer, ...

## Service

Should contain database connexion, queue...

## Middleware

All express middlewares like body parser, session, form parser, passport...

## Route

Contain API Endpoints and error handlers

```javascript

return [
  {
    method: 'get', // |'put'|'post'|'delete'|'all'
    url: '/test',
    handler: async (req, res, next) => res
      .status(200)
      .json({ success: true, result: 'test' })
  }
]

```
