import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = (searchParams.get("q") || "").trim();
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 500); // 默认50条，最大500
  const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);  // 默认从0开始

  if (!keyword) {
    return NextResponse.json(
      { message: "Missing required parameter: q (author search keyword)" },
      { status: 400 }
    );
  }

  const like = `%${keyword}%`;

  try {
    const { rows } = await pool.query(
      `
      SELECT id, img, tag, title, description, authors, slug, blog_index, created_at
      FROM blogs
      WHERE authors ILIKE $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
      `,
      [like, limit, offset]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Search by author API error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

