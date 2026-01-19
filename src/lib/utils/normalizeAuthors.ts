// utils/normalizeAuthors.ts
export type Author = {
  name: string
  [key: string]: any
}

export function normalizeAuthors(
  authors: unknown
): Author[] {
  if (!authors) return []

  // 已经是数组
  if (Array.isArray(authors)) {
    return authors
  }

  // 单个对象
  if (typeof authors === "object") {
    return [authors as Author]
  }

  // 其他情况（string / number / etc）
  return []
}
