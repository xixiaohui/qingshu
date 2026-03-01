
import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db";
import { CardItem } from "@/components/test/MainContentCard";

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
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (error) {
    console.error("GET /api/blogs error:", error)

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}