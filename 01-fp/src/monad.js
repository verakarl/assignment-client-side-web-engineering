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
 class Monad {
    static get [Symbol.species]() {
      console.log(this)
      return this;
    }

    constructor(...extensions) {
      this.extensions = this.extensions;
    }

   extend(name, fn) {
    // name style --> function 
    console.log(name, fn);
    console.log(this.extensions);
    this.extensions[name] = fn;
    console.log(this.constructor)
    // return this.constructor;
    const This = this.constructor[Symbol.species]; // function Monad
    return new This(name, fn);
   }
 }

export function d() {
  return new Monad({});
}

// lift - which converts a ‘simple’ function into a debuggable function
// bind - which converts a debuggable function into a composable form
// unit - which converts a simple value into the format required for debugging, by placing it in a containe
