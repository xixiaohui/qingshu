// import pool from '@/lib/db'
// import { NextResponse } from 'next/server'

// const query_asc = `
// SELECT id, title, created_at,description,tag,content,img,slug,updated_at,authors,index
//     FROM blogs
//     ORDER BY created_at ASC
//     LIMIT 100
// `;
// const query_desc =`
// SELECT id, title, created_at,description,tag,content,img,slug,updated_at,authors,index
//     FROM blogs
//     ORDER BY created_at DESC NULLS LAST
//     LIMIT 20
// `;

// export async function GET() {
//   const { rows } = await pool.query(query_desc)

//   return NextResponse.json(rows)
// }

import pool from "@/lib/db";
import { NextResponse } from "next/server";

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

  return NextResponse.json({
    data: dataResult.rows,
    total: Number(countResult.rows[0].count),
  });
}
