/*
 * Implement a monad with the following requirements and features
 *
 * - Create a monad
 * - 1. type constructor: Create a constructor for a monad
 * - 2. unit function: Wrap a value of given type into a monad
 * - 3. bind function: allow chaining of operations on a monadic value
 * - Implement a fake DOM library
 * - Implement style function
 * - Implement fadeOut function
 *
 * Example:
 *
 * const $ = d()
 *  .extend("style", function(style) {…})
 *  .extend("fadeOut", function(style) {…})
 *
 * $({})
 *   .style({ color: "red" })
 *   .fadeOut();
 */
export function d() {
  const prototype = {};
  prototype.isD = true;

  function create(val) {
    const e = Object.create(prototype);
    e.val = val;
    e.bind = (fn, args) => fn.apply(e, args);
    return e;
  }

  create.extend = function extend(name, fn) {
    prototype[name] = function extended(...args) {
      const result = this.bind(fn, args);
      return result && result.isD ? result : create(result);
    };
    return create;
  };

  return create;
}
