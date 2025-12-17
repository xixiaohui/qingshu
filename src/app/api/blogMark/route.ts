import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { BlogMark } from "@/lib/util";


// POST: 存储高亮
export async function POST(req: NextRequest) {
  try {
    const mark: BlogMark = await req.json();

    const { data, error } = await supabase.from("blog_marks").insert([mark]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "未知错误" }, { status: 500 });
  }
}
