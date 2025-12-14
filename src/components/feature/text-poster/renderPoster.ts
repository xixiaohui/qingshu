import { SHARE_IAMGE_HEIGHT, SHARE_IAMGE_WIDTH } from "@/lib/util";
import { drawAutoSizedText, drawMultilineText, drawMultilineTextLeft } from "./drawMultilineText";

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
  ctx.font = "bold 57px 'Songti SC', 'SimSun', 'STSong', serif";
  ctx.textAlign = "left"; // 左对齐
  const padding = 80; // 左右边距
  const topPadding = 170;
  const text_results = text.split("/7/7/7/7");
  const title = text_results[0];
  const content = text_results[1];
  // console.log(text_results);
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
  (ctx.font = "37px 'Songti SC', 'SimSun', 'STSong', serif"),
    (ctx.fillStyle = "#373737");
  ctx.textAlign = "left";
  ctx.fillText("readmeet.club", padding, height - lineHeight);
}

