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
  if (typeof authors === "string") {
    return [{name:authors,avatar:"/static/images/avatar/7.jpg"}]
  }

  // 其他情况（string / number / etc）
  return []
}
