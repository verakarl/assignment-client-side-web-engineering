/*
 * Implement a partial function. The function should return a variation of
 * the original function that can be invoked partially. Do also implement a
 * placeholder constant that can be used during invocation.
 *
 * - Works with an arbitrary length of arguments
 * - Works with an arbitrary number of placeholder elements!
 * - `partial` is a pure function!
 */
export const _ = undefined;

export function partial(fn) {
  return function rec(...params) {
    if (params.length === 0) {
      return fn();
    }
    return (...a) => {
      const concatenatedParams = params.concat(a);
      const filteredParams = concatenatedParams.filter(param => param !== undefined);
      if (concatenatedParams.length >= fn.length && !a.includes(_)) {
        return fn(...filteredParams);
      }
      return rec(...concatenatedParams);
    };
  };
}
