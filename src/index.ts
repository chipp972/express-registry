import { ExpressRegistry } from './express-registry';
export {
  ExpressRegistry,
  HandlerObject,
  RouterObject,
} from './express-registry';

const EXPRESS_REGISTRY = Symbol.for('expressRegistry');

export default function getExpressRegistry(port?: number): ExpressRegistry {
  const globalSymbols = Object.getOwnPropertySymbols(global);
  const hasRegistry = globalSymbols.indexOf(EXPRESS_REGISTRY) > -1;
  if (!hasRegistry) {
    // @ts-ignore
    global[EXPRESS_REGISTRY] = new ExpressRegistry(port);
  }
  // @ts-ignore
  return global[EXPRESS_REGISTRY];
}
