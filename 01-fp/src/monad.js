/*
 * Implement a monad with the following requirements and features
 *
 * - Create a monad
 * - 1. type constructor: Create a constructor for a monad
 * - 2. unit function: Wrap a value of given type into a monad // lift = constructor
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
// inspired by https://www.youtube.com/watch?v=b0EF0VTs9Dc
export function d() {
  // constructor function 
  const prototype = Object.create(null);
  // unit function
  const monad = a => {
    const instance = Object.create(prototype);
    // bind function
    instance.bind = (fn, args) => fn(a, ...args);
    return instance;
  };
  // lift / extend  function 
  monad.extend = (name, fn) => {
    prototype[name] = (...args) => {
      return monad(this.bind(fn, args));
    };
    return monad;
  };
  return monad;
}
