import pool from '@/lib/db'
import { NextResponse } from 'next/server'


const query_asc = `
SELECT id, title, created_at,description,tag,content,img,slug,updated_at,authors 
    FROM blogs 
    ORDER BY created_at ASC
    LIMIT 100
`;
const query_desc =`
SELECT id, title, created_at,description,tag,content,img,slug,updated_at,authors 
    FROM blogs 
    ORDER BY created_at DESC NULLS LAST
    LIMIT 20
`;

export async function GET() {
  const { rows } = await pool.query(query_desc)

  return NextResponse.json(rows)
}
