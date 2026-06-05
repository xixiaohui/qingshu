import { NextResponse } from "next/server";

// ✅ 统一 CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ 处理预检请求（必须）
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  const { text } = await req.json();

  return NextResponse.json(
    {
      message: "翻译成功",
      result: text + " (翻译后)"
    },
    { headers: corsHeaders }
  );
}
