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
  const isISO =
    dateString.includes("T") || /^\d{4}-\d{2}-\d{2}/.test(dateString);

  if (isISO) {
    const date = new Date(dateString);
    // 格式化为中文日期
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  } else {
    // 已经是中文日期格式，直接返回
    return dateString;
  }
};

export function splitByLineLength(text: string, maxPerLine: number): string[] {
  const result: string[] = [];

  for (let i = 0; i < text.length; i += maxPerLine) {
    result.push(text.slice(i, i + maxPerLine));
  }
  return result;
}

export const splitBySpecial = (str: string) => {
  return str
    .split(/(?=##)/) // 正向断言：以 "##" 作为开头位置切割
    .filter((s) => s.trim() !== "");
};

export function splitTextToPages(text: string, pageSize: number = 1000) {
  const pages = [];
  for (let i = 0; i < text.length; i += pageSize) {
    pages.push(text.slice(i, i + pageSize));
  }
  return pages;
}

export const chips = [
  "精選",
  "表白專欄",
  "散場信箱",
  "曖昧集",
  "心緒日記",
  "情書博物館",
  "Shakespeare",
];

export const LATEST = "最新";

export const PAGE_LIMIT = 7;

export const mainKeyWords = [
  "精選",
  "表白專欄",
  "散場信箱",
  "曖昧集",
  "心緒日記",
  "情書博物館",
  "Shakespeare",
  "Elizabeth",
  "Christina",
  "Byron",
  "gutenberg",
  "Twain, Mark",
  "Jefferson, Thomas",
  "Lincoln",
  "Sand, George",
  "Burnand, F. C."

];

export const SHARE_IAMGE_WIDTH = 1280;
export const SHARE_IAMGE_HEIGHT = 1707;

export const BEIJING_COLOR = '#F3F0E6';
export const FONT_COLOR = '#373737';

export type BlogMark = {
  id: string;
  blog_id: number;
  start: number;
  end: number;
  bg_color: string;
  text_color?: string;
  style: "highlight" | "underline";
  excerpt?: string;
  created_at: string;
  rect?: DOMRect;
};

export type BlogSummary = {
  id: string;
  blog_id: number;
  mark_id: string;
  content: string;
  author: "user" | "ai";
  created_at: string;
};

export function isPointInRect(
  x: number,
  y: number,
  rect: DOMRect
) {
  if(!rect){
    return false;
  }
  return (
    x >= rect.left &&
    x <= rect.right &&
    y >= rect.top &&
    y <= rect.bottom
  );
}

