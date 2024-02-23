/**
 * Creates a new object by omitting specified keys from the input object.
 *
 * @template T - The type of the input object.
 * @template K - The type of the keys to be omitted.
 * @param {T} obj - The input object.
 * @param {K[]} keys - The keys to be omitted from the input object.
 * @returns {Omit<T, K>} - A new object with the specified keys omitted.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}
