export function safeParseFloat(value: number | string): number {
  return typeof value == 'string' ? parseFloat(value) : value
}