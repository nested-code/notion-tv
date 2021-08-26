// /** Pick using union of keys from given array. */
// type PickKeys<T, K extends Array<keyof T> = {
//   Pick<T, K[number]>
// }

/** Create new object from selected keys of a given object. */
export const pick = <
  T extends Record<string, unknown>,
  K extends keyof T
>(object: T, keys: K[]) =>
  keys.reduce((accumulator, key) => {
    if (object && object.hasOwnProperty(key)) accumulator[key] = object[key]
    return accumulator
   }, {} as any) as Pick<T, typeof keys[number]>

/** Infer the type of an array's members. */
export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Map over array of objects to create new array with only selected keys. */
export const pickMap = <
  A extends Record<string, unknown>[],
  T extends ArrayElement<A>,
  K extends keyof T
>(array: T[], keys: K[]) =>
   array.map(obj => pick(obj, keys))
