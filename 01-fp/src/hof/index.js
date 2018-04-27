import data from './data.json';
/*
 * Implement a pure function "pow". The function should behave the same as
 * Math.pow(n, n) -> Math.pow(2, 2) = 4 but should not use Math.pow(…). Find an
 * elegant and pure functional solution to the problem w/o any side-effects.
 *
 * - Works with positive integers ℤ+!
 * - Throws an error if exponent is invalid
 */
export function pow(base, exponent) {
  return new Array(exponent).fill(base)
  .reduce((acc, currentValue) => acc *= currentValue);
}


// in JS viele Wege um Herauszufinden welcher Typ das ist etc.

/*
 * Implement a sortBy function that is capable of sorting any field within the
 * set "data.json".
 *
 * - Provides a primer for complex fields // sort by field name HOF die concatination von first & last
 * - Throws an error if arguments are invalid
 */
export function sortBy(fieldName, primer) {
  return (a,b) => {
    let A = a[fieldName];
    let B = b[fieldName];
    if (primer) {
      A = primer(A)
      B = primer(B)
    }
    return A < B ? -1 : A > B ? 1 : 0
  }
}

