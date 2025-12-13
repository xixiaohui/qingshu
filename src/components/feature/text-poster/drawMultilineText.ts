export function drawMultilineText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let line = "";
  let offsetY = 0;

  for (const ch of text) {
    const testLine = line + ch;
    if (ctx.measureText(testLine).width > maxWidth) {
      ctx.fillText(line, x, y + offsetY);
      line = ch;
      offsetY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y + offsetY);
}


export function drawMultilineTextLeft(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  let line = "";
  let offsetY = 0;

  for (const ch of text) {
    const testLine = line + ch;
    if (ctx.measureText(testLine).width > maxWidth) {
      ctx.fillText(line, x, y + offsetY); // 左对齐
      line = ch;
      offsetY += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, x, y + offsetY); // 绘制最后一行
}
