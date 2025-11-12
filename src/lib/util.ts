export function getRandomIntBetween(min: number, max: number): number {
  // Math.random() -> [0, 1)
  // Math.floor -> 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const chips = [
  "精选",
  "表白专栏",
  "散场信箱",
  "暧昧集",
  "心绪日记",
  "情书博物馆",
  "Love"
];

export const LATEST = "最新"