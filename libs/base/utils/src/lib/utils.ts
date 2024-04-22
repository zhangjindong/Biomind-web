/**
 * '9' to '09'
 * @param num
 * @returns
 */
export function toDoubleDigit(num: number) {
  return ('0' + num).slice(-2);
}
