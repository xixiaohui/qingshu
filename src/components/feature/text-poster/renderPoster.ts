import { SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";
import {
  drawAutoSizedText,
  drawMultilineText,
  drawMultilineTextLeft,
} from "./drawMultilineText";

export async function renderPoster(
  ctx: CanvasRenderingContext2D,
  text: string
) {

  const width = SHARE_IAMGE_WIDTH;
  const height = SHARE_IAMGE_HEIGHT;

  // 背景
  ctx.fillStyle = "#F3F0E6";
  ctx.fillRect(0, 0, width, height);

  // 中文文本 - 左对齐
  ctx.fillStyle = "#373737";
  ctx.font = "bold 67px 'Songti SC', 'SimSun', 'STSong', serif";
  ctx.textAlign = "left"; // 左对齐
  const padding = 80; // 左右边距
  const topPadding = 170;
  const text_results = text.split("/7/7/7/7");
  const title = text_results[0];
  const content = text_results[1].replace(/(?<!\n)\n\n(?!\n)/g, "");
  console.log(content);
  const lineHeight = 70;

  // const lineHeight = 100; // 正文字号对应行高
  ctx.strokeText(title, padding, topPadding);
  drawMultilineTextLeft(
    ctx,
    title,
    padding,
    topPadding,
    width - padding * 2,
    lineHeight
  );

  drawAutoSizedText({
    ctx,
    text: content,
    box: {
      x: padding,
      y: topPadding + lineHeight,
      width: width - padding * 2,
      height: height - (topPadding + lineHeight) * 2,
    },
    maxFontSize: 67,
    minFontSize: 17,
    color: "#373737",
  });

  // 水印
  ctx.font = "37px 'Noto Serif TC','Songti SC', 'SimSun', 'STSong', serif";
  ctx.fillStyle = "#373737";
  ctx.textAlign = "left";

  const logo_text = getDomain()==="localhost"?"www.readmeet.club":getDomain();

  const textY = height - lineHeight;

  // 先量文字宽度
  const metrics = ctx.measureText(logo_text);
  const textWidth = metrics.width * 0.618;

  // 画文字
  ctx.fillText(logo_text, padding, textY);

  // 🔴 红色矩形（宽度 = 文字宽度）
  ctx.fillStyle = "#E53935";
  ctx.fillRect(
    padding,        // x：和文字左对齐
    height - topPadding - lineHeight,       // y：文字上方
    textWidth,       // ⭐ 宽度等于文字宽度
    17                // 高度
  );
}

function useCurrentUrl() {
  if (typeof window === "undefined") return ""; // SSR 时防止报错
  return window.location.href;
}

function useHost() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export const getDomain = (req?: any) => {
  if (typeof window !== "undefined") {
    return window.location.hostname;
  } else if (req) {
    return req.headers.host.split(":")[0];
  }
  return "";
};