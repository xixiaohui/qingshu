import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ 统一 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};


// ✅ 处理预检请求（必须）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");

  if (!keyword) {
    return NextResponse.json([], { status: 400, headers: corsHeaders });
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
      return NextResponse.json(rows, { headers: corsHeaders });
    }
  }

  return NextResponse.json([], { headers: corsHeaders });
}
