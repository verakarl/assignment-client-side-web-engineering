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
  function rec(level, params) {
    return (...a) => {
      if (a.length === 0) {
        return fn();
      }
      return level - a.length <= 0 ? fn(...a, ...params) : rec(level - a.length, params.concat(a));
    };
  }
  return rec(numArgs, []);
}



// function (a,b)
// const C = f.curry()
// f(1)(2)
// f = (a) => (b) => a + b
// f(1) (Anzahl der Parameter ist Anzahl der verschachtelten Ebenen)
/*
  f.length (gibt Stelligkeit der Funktion zurück)
  pro Ebene wird length - 1 gerechnet um Rekursion zu erhalten (sonst muss man sie als Übergabeparameter nehmen)
  curryPow = curry(fun pow(a,b) ... )
    function curry(fn) {
      let nArgs = fn.length
      fn ist das this
    }
*/
