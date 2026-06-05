import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ 统一 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ 处理预检请求（必须）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

///api/blogs?page=1&pageSize=10

//给表建立索引
// CREATE INDEX idx_blogs_created_at_desc
// ON blogs (created_at DESC);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  const offset = (page - 1) * pageSize;

  // 1️⃣ 查当前页数据
  const dataResult = await pool.query(
    `
    SELECT id, title, created_at, description, tag, img, slug, updated_at, authors,blog_index
    FROM blogs
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
    `,
    [pageSize, offset],
  );

  // 2️⃣ 查总数
  const countResult = await pool.query(`SELECT COUNT(*) FROM blogs`);

  return NextResponse.json(
    {
      data: dataResult.rows,
      total: Number(countResult.rows[0].count),
    },
    { headers: corsHeaders }
  );
}
