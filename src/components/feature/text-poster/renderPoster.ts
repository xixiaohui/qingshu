import { SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";
import { drawMultilineText, drawMultilineTextLeft } from "./drawMultilineText";

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
  ctx.font = "47px 'PingFang SC', 'Heiti SC', 'Songti SC', sans-serif";
  ctx.textAlign = "left"; // 左对齐
  const padding = 80; // 左右边距
  const topPadding = 170; // 文字起点
  const lineHeight = 72;  // 正文字号对应行高
  drawMultilineTextLeft(ctx, text, padding, topPadding, width - padding * 2, lineHeight);

  // 水印
  ctx.font = "24px 'PingFang SC', 'Heiti SC', 'Songti SC', sans-serif";
  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.textAlign = "left";
  ctx.fillText("qinshu.shop", padding, height - 80);
}
