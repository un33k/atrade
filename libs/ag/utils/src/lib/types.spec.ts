import { isString, isObject } from './types';

describe('Agnostic Utils - Types', function() {
  it('should return true when isString arg is a string', function() {
    const value = isString('a string');
    expect(value).toBe(true);
  });

  it('should return false when isString arg is an object', function() {
    const value = isString({});
    expect(value).toBe(false);
  });

  it('should return true when isObject arg is an object', function() {
    const value = isObject({});
    expect(value).toBe(true);
  });

  it('should return false when isObject arg is not an object', function() {
    const value = isObject('not an object');
    expect(value).toBe(false);
  });
});
