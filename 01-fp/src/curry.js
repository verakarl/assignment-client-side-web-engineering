/*
 * Implement a currify function. The function should return a currified
 * variation of the given function.
 *
 * - Works with an arbitrary length of arguments
 * - Works with ...rest if curry is invoked with a second argument "length"
 * - `curry` is a pure function!
 * - Has auto currying after initial call
 */
export function curry(fn, numArgs = fn.length) {
  // wrap for reuse
  return (...a) => {
    function c(fn, len, ...a) {
      // invoke function if no arguments left
      if (a.length < 1) {
        return fn();
      }
      // subtract number of provided arguments from number of total arguments
      len -= a.length;
      // if missing arguments === 0, invoke currified function with given args
      if (len === 0) {
        return fn.apply(fn, a);
      }
      // create function which applies all given arguments
      const auto = (...b) => fn.apply(fn, a.concat(b));
      // wrap and currify return function
      return (...b) => c(auto, len, ...b);
    }
    // invoke currified function
    return c(fn, numArgs, ...a);
  };
}
