import { expect } from 'chai';
import getSingleton from '../src/index';

describe('Hello World', function() {
  it('should work', async function() {
    const registry = getSingleton(7000);
    const conf = { a: 'a' };
    registry.addConfig(conf);
    expect(registry.getConfig()).to.deep.equal(conf);
  });
});
