import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db";
import { CardItem } from "@/components/test/MainContentCard";

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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ identifier: string }>}
) {
    const { identifier } = await params
  try {
    const { rows } = await pool.query<CardItem>(
      `
      SELECT *
      FROM blogs
      WHERE id = $1
      LIMIT 1
      `,
      [identifier]
    )

    if (!rows[0]) {
      return NextResponse.json(
        { message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      )
    }

    return NextResponse.json(rows[0], { headers: corsHeaders })
  } catch (error) {
    console.error("GET /api/blogs error:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    )
  }
}
