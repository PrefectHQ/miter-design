export function pick<T extends Record<string, any>>(obj: T, keys: string[]) {
  return Object.fromEntries(keys.filter(key => key in obj).map(key => [key, obj[key]]))
}