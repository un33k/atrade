import { isString, isObject, isDefined } from './ag-types';

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

  it('should return true if isDefined arg is defined', function() {
    const definedConst = 'foobar';
    const value = isDefined(definedConst);
    expect(value).toBe(true);
  });

  it('should return false if isDefined arg is not defined', function() {
    let definedConst;
    const value = isDefined(definedConst);
    expect(value).toBe(false);
  });
});
