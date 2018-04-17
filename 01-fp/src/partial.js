/*
 * Implement a partial function. The function should return a variation of
 * the original function that can be invoked partially. Do also implement a
 * placeholder constant that can be used during invocation.
 *
 * - Works with an arbitrary length of arguments
 * - Works with an arbitrary number of placeholder elements!
 * - `partial` is a pure function!
 */
export const _ = Symbol("_");

export function partial(fn, numArgs = fn.length) {
  // wrap for reuse
  return (...a) => {
    function p(fn, len, indices2, args2, ...b) {
      // clone indices and args to avoid side-effects
      const indices = indices2.slice(0);
      const args = args2.slice(0);

      // loop over provided arguments ...a and missing indices
      while (b.length > 0) {
        const arg = b.shift();
        // skip to next argument if it is a placeholder
        if (arg === _) {
          continue;
        }
        const index = indices.shift();
        args.splice(index, 1, arg);
        len -= 1;
      }

      // if there are no missing indices, invoke function with args
      if (len === 0) {
        return fn.apply(fn, args);
      }

      // return partially applied function
      return (...b) => p(fn, len, indices, args, ...b);
    }

    // wrap function for partial application
    const indices = Array.from(Array(numArgs).keys());
    const args = Array(numArgs).fill(_);

    return p(fn, numArgs, indices, args, ...a);
  };
}
