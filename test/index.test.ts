import { clearGlobals, getExpressRegistry } from '../src/index';

describe('Express Registry', function() {
  afterEach(function() {
    clearGlobals();
  });

  it('should be able to add config', () => {
    const registry = getExpressRegistry(7000);
    const conf = { a: 'a' };
    const conf2 = { b: 'b' };
    registry.addConfig(conf).addConfig(conf2);
    expect(registry.getConfig()).toEqual({ a: 'a', b: 'b' });
  });
});
