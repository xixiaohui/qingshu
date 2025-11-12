export function getRandomIntBetween(min: number, max: number): number {
  // Math.random() -> [0, 1)
  // Math.floor -> 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min;
}