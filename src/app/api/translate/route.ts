import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, target } = await req.json();

  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${target}&dt=t&q=${encodeURIComponent(
    text
  )}`;

  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json({
    result: data[0][0][0], // 翻译后的字符串
  });
}


