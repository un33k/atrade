/**
 * Returns the value for a nested prop or returns the fallback value (default = null)
 * @param fn Function that returns nested props
 * @param fallback Fallback value if nested prop is undefined
 * Ex: tryGet(() => a.b.c.d.e.f.g, 'Default G')
 * Note: tryGet() works on try:catch, where try() execution is cheap and catch() is x10 try()
 */
export function tryGet<T = any>(fn: () => {}, fallback = null): T {
  try {
    return fn() as T;
  } catch (e) {
    if (e instanceof TypeError) {
      return fallback;
    }
    throw e;
  }
}
