// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { text } = await req.json();
//   try {
//     const res = await fetch("https://libretranslate.de/translate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         q: text,
//         source: "auto",
//         target: "zh",
//         format: "text",
//       }),
//     });

//     if (!res.ok) {
//       const textRes = await res.text();
//       console.error("翻译失败:", textRes);
//       return NextResponse.json({ result: "翻译失败" }, { status: res.status });
//     }

//     const data = await res.json();
//     return NextResponse.json({ result: data.translatedText });
//   } catch (error) {
//     console.error("翻译异常:", error);
//     return NextResponse.json({ result: "翻译失败" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST(req: Request) {

  
//   try {
//     const { text } = await req.json();

//     console.log(text)

//     if (!text) {
//       return NextResponse.json({ error: "缺少文本" }, { status: 400 });
//     }

//     const url = `https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=auto&tl=zh-CN&q=${encodeURIComponent(text)}`;

//     const res = await fetch(url);

//     if (!res.ok) {
//       throw new Error("翻译服务错误: " + res.status);
//     }

//     const data = await res.json();
//     const translated = data[0].map((item: any) => item[0]).join("");

//     return NextResponse.json({ result: translated });
//   } catch (err) {
//     console.error("翻译异常:", err);
//     return NextResponse.json({ error: "翻译失败" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  return NextResponse.json({
    message: "翻译成功",
    result: text + " (翻译后)"
  });
}

