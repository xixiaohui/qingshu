import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");

  if (!keyword) {
    return NextResponse.json([], { status: 400 });
  }

  const like = `%${keyword}%`;

  const queries = [
    `tag ILIKE $1`,
    `title ILIKE $1`,
    `content ILIKE $1`,
  ];

  for (const condition of queries) {
    const { rows } = await pool.query(
      `
      SELECT id, img, tag, title, description, authors, slug,blog_index,created_at
      FROM blogs
      WHERE ${condition}
      ORDER BY created_at DESC
      LIMIT 50
      `,
      [like]
    );

    if (rows.length > 0) {
      return NextResponse.json(rows);
    }
  }

  return NextResponse.json([]);
}
