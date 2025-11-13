export function getRandomIntBetween(min: number, max: number): number {
  // Math.random() -> [0, 1)
  // Math.floor -> 向下取整
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

export const formatDateSmart = (dateString: string) => {
  if (!dateString) return "";

  // 判断是否为 ISO 格式（带 T 或 - 符号）
  const isISO = dateString.includes("T") || /^\d{4}-\d{2}-\d{2}/.test(dateString);

  if (isISO) {
    const date = new Date(dateString);
    // 格式化为中文日期
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    // 已经是中文日期格式，直接返回
    return dateString;
  }
};

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