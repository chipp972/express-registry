import { EventEmitter } from 'events';
import { onError, onListening } from '../src/server';

describe('Server callback utilities', () => {
  let eventEmitter: any;

  beforeEach(() => {
    console.error = jest.fn();
    eventEmitter = new EventEmitter();
    eventEmitter.address = jest.fn(() => ({
      port: 5000,
    }));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('onError', () => {
    const handler = onError(eventEmitter);
    // eventEmitter.emit('error', { syscall: 'listen' })
    // console.log(handler);
    // expect(handler).toThrowError();
    expect(handler).toBeDefined();
  });

  it('onListening', () => {
    onListening(eventEmitter);
  });
});
