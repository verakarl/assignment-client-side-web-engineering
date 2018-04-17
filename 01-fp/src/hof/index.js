/*
 * Implement a pure function "pow". The function should behave the same as
 * Math.pow(n, n) -> Math.pow(2, 2) = 4 but should not use Math.pow(…). Find an
 * elegant and pure functional solution to the problem w/o any side-effects.
 *
 * - Works with positive integers ℤ+!
 * - Throws an error if exponent is invalid
 */
export function pow(b, n) {
  if (
    !(
      Object.prototype.toString.call(n) === "[object Number]" &&
      n % 1 === 0 &&
      n > 0
    )
  ) {
    throw new Error("");
  }
  return Array.apply(null, { length: n - 1 }).reduce(s => s * b, b);
}

/*
 * Implement a sortBy function that is capable of sorting any field within the
 * set "data.json".
 *
 * - Provides a primer for complex fields
 * - Throws an error if arguments are invalid
 */
export function sortBy(field, primer) {
  const key = x => (primer ? primer(x[field]) : x[field]);
  return (a, b) => {
    const fA = key(a);
    const fB = key(b);
    return fA < fB ? -1 : fA > fB ? 1 : 0;
  };
}
