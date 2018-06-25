import express, { Application, Router } from 'express';
import { RequestHandlerParams } from 'express-serve-static-core';
import { createServer } from 'http';
import { ModuleRegistry } from 'singleton-module-registry';
import { onError, onExit, onListening } from './server';

export interface HandlerObject {
  method: 'get' | 'post' | 'put' | 'delete' | 'all';
  url: string;
  handler: RequestHandlerParams;
}

export interface RouterObject {
  url?: string;
  router: Router;
}

export class ExpressRegistry extends ModuleRegistry {
  private port: number;
  private app: Application;
  private config: { [configName: string]: any };
  private lib: { [libName: string]: any };
  private services: { [serviceName: string]: any };
  private middlewares: RouterObject[];
  private routes: HandlerObject[];

  constructor(port?: number) {
    super();
    this.app = express();
    this.config = {};
    this.lib = {};
    this.services = {};
    this.middlewares = [];
    this.routes = [];
    this.port = port || 5000;
  }

  public addConfig(config: { [configName: string]: any }) {
    this.config = Object.assign(this.config, config);
    this.registerModule(this.config, 'config');
    return this;
  }

  public getConfig() {
    return this.config;
  }

  public addLib(lib: { [libName: string]: any }) {
    this.lib = Object.assign(this.lib, lib);
    this.registerModule(this.lib, 'lib');
    return this;
  }

  public addServices(services: { [serviceName: string]: any }) {
    this.services = Object.assign(this.services, services);
    this.registerModule(this.services, 'services');
    return this;
  }

  public getServices() {
    return this.services;
  }

  public getLib() {
    return this.lib;
  }

  public addMiddlewares(middlewares: RouterObject[]) {
    this.middlewares = this.middlewares.concat(middlewares);
    return this;
  }

  public addRoutes(routes: HandlerObject[]) {
    this.routes = this.routes.concat(routes);
    return this;
  }

  public getApp() {
    return this.app;
  }

  public startServer() {
    try {
      this.configureApp();
      const app = this.app;
      const server = createServer(app);

      server.once('listening', onListening(server));
      onError(server);
      process.once('SIGINT', onExit);
      process.once('SIGTERM', onExit);

      server.listen(this.port);
    } catch (err) {
      console.error(err);
    }
  }

  private configureApp() {
    this.middlewares.forEach(({ url, router }) =>
      this.app.use(url || '/', router),
    );
    this.routes.forEach(({ method, url, handler }) =>
      this.app[method](url, handler),
    );
  }
}
