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

/**
 * GET /api/blogs/hero?blog_index=3100
 * 根据 blog_index 查询单篇博客（用于 Hero 展示）
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const blogIndex = searchParams.get("blog_index");

  if (!blogIndex) {
    return NextResponse.json(
      { message: "Missing required parameter: blog_index" },
      { status: 400, headers: corsHeaders }
    );
  }

  const indexNum = parseInt(blogIndex, 10);
  if (isNaN(indexNum)) {
    return NextResponse.json(
      { message: "Invalid parameter: blog_index must be a number" },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const { rows } = await pool.query(
      `
      SELECT id, img, tag, title, description, authors, slug, blog_index, created_at
      FROM blogs
      WHERE blog_index = $1
      LIMIT 1
      `,
      [indexNum]
    );

    if (!rows[0]) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(rows[0], { headers: corsHeaders });
  } catch (error) {
    console.error("GET /api/blogs/hero error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
