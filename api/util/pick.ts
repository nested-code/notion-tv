// /** Pick using union of keys from given array. */
// type PickKeys<T, K extends Array<keyof T> = {
//   Pick<T, K[number]>
// }

/** Create new object from selected keys of a given object. */
export const pick = <
  T extends Record<string, unknown>,
  K extends keyof T
>(object: T, keys: readonly K[]) =>
  keys.reduce((accumulator, key) => {
    if (object && object.hasOwnProperty(key)) accumulator[key] = object[key]
    return accumulator
   }, {} as any) as Pick<T, typeof keys[number]>

/** Infer the type of an array's members. */
export type ArrayElement<ArrayType extends readonly unknown[]> = 
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

/** Basic type util to make a union from an array - @todo move to type utils. */
export type Union<T extends ReadonlyArray<unknown>> = T[number]

/** Access keys of element type in array. */
export type KeyOfElement<T extends readonly unknown[]> = keyof ArrayElement<T>

/** Array type of picked keys from another array's element type. */
export type PickMap<T extends unknown[], K extends KeyOfElement<T>> = Pick<ArrayElement<T>, K>

/** Convert array of keys of type to a union of keys. */
export type KeysIn<T, K extends (keyof T)[]> = K[number]

/** Map over array of objects to create new array with only selected keys. */
export const pickMap = <
  A extends Record<string, unknown>[],
  T extends ArrayElement<A>,
  K extends keyof T
>(array: T[], keys: readonly K[]) =>
   array.map(obj => pick(obj, keys))
