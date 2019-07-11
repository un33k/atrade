/**
 * Returns true if argument is an object
 * @param arg argument of type any
 */
export const isObject = (arg: any): boolean => {
  return arg && typeof arg === 'object';
};

/**
 * Returns true if argument is a string
 * @param arg argument of type any
 */
export const isString = (arg: any): boolean => {
  return arg && typeof arg === 'string';
};

/**
 * Returns true if argument is defined
 * @param arg argument of type any
 */
export const isDefined = (arg: any): boolean => {
  return typeof arg !== 'undefined';
};

/**
 * Returns true if argument is a function
 * @param arg argument of type any
 */
export const isFunction = (arg: any): boolean => {
  return typeof arg === 'function' || false;
};