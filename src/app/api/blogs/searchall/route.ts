import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "50", 10);  // 默认50条
  const offset = parseInt(searchParams.get("offset") || "0", 10); // 默认从0开始

  if (!keyword) {
    return NextResponse.json([], { status: 400 });
  }

  const like = `%${keyword}%`;

  try {
    const { rows } = await pool.query(
      `
      SELECT DISTINCT id, img, tag, title, description, authors, slug, blog_index, created_at
      FROM blogs
      WHERE tag ILIKE $1
         OR title ILIKE $1
         OR content ILIKE $1
      ORDER BY created_at ASC
      LIMIT $2 OFFSET $3
      `,
      [like, limit, offset]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

