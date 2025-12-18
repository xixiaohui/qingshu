import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { BlogMark } from "@/lib/util";


/**
 * POST /api/highlight
 */
export async function POST(req: NextRequest) {
  try {
    const mark: BlogMark = await req.json();

    const { error } = await supabase
      .from("blog_marks")
      .insert([mark]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
