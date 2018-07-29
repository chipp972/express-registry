import { expect } from 'chai';
import { clearGlobals, getExpressRegistry } from '../src/index';

describe('Express Registry', function() {
  afterEach(function() {
    clearGlobals();
  });

  it('should work', async function() {
    const registry = getExpressRegistry(7000);
    const conf = { a: 'a' };
    registry.addConfig(conf);
    expect(registry.getConfig()).to.deep.equal(conf);
  });
});
