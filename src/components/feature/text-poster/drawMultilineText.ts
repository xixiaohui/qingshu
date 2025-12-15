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


type TextBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type DrawAutoSizedTextOptions = {
  minFontSize?: number;
  maxFontSize?: number;
  lineHeightRatio?: number;
  fontFamily?: string;
  color?: string;
};

export function drawAutoSizedText({
  ctx,
  text,
  box,
  minFontSize = 36,
  maxFontSize = 80,
  lineHeightRatio = 1.3,
  fontFamily = "'Songti SC', 'SimSun', 'STSong', serif",
  color = "#373737",
}: {
  ctx: CanvasRenderingContext2D;
  text: string;
  box: TextBox;
} & DrawAutoSizedTextOptions) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.textAlign = "left";
  ctx.textBaseline = "top";

  // 从大到小试字号，直到能放进 box
  for (let fontSize = maxFontSize; fontSize >= minFontSize; fontSize--) {
    const lineHeight = fontSize * lineHeightRatio;
    ctx.font = `${fontSize}px ${fontFamily}`;

    const lines = breakLines(ctx, text, box.width);
    const totalHeight = lines.length * lineHeight;

    if (totalHeight <= box.height) {
      // 找到合适字号，开始绘制
      // ⭐ 垂直居中关键代码
      const visualOffset = lineHeight * 0.15;
      let y = box.y + (box.height - totalHeight) / 2 - visualOffset;

      for (const line of lines) {
        ctx.fillText(line, box.x, y);
        y += lineHeight;
      }
      ctx.restore();
      return;
    }
  }

  // 兜底：最小字号强制绘制（可能会被裁）
  const fontSize = minFontSize;
  const lineHeight = fontSize * lineHeightRatio;
  ctx.font = `${fontSize}px ${fontFamily}`;
  const lines = breakLines(ctx, text, box.width);

  let y = box.y;
  for (const line of lines) {
    if (y + lineHeight > box.y + box.height) break;
    ctx.fillText(line, box.x, y);
    y += lineHeight;
  }

  ctx.restore();
}

// function breakLines(
//   ctx: CanvasRenderingContext2D,
//   text: string,
//   maxWidth: number
// ): string[] {
//   const lines: string[] = [];
//   let current = "";

//   for (const char of text) {
//     const testLine = current + char;
//     const { width } = ctx.measureText(testLine);

//     if (width > maxWidth && current) {
//       lines.push(current);
//       current = char;
//     } else {
//       current = testLine;
//     }
//   }

//   if (current) lines.push(current);
//   return lines;
// }

export function breakLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const lines: string[] = [];

  // 先按换行符分段（保留空段）
  const paragraphs = text.split(/\n\n\n/);

  for (let p = 0; p < paragraphs.length; p++) {
    const paragraph = paragraphs[p];

    // 空行（由 \n\n 产生）
    if (paragraph.trim() === "") {
      lines.push(""); // 空行占位
      continue;
    }

    let current = "";

    for (const char of paragraph) {
      const testLine = current + char;
      const { width } = ctx.measureText(testLine);

      if (width > maxWidth && current) {
        lines.push(current);
        current = char;
      } else {
        current = testLine;
      }
    }

    if (current) lines.push(current);

    // 段落结束但不是最后一段 → 换行
    if (p < paragraphs.length - 1) {
      lines.push("");
    }
  }

  return lines;
}

export function prepareHiDPICanvas(
  canvas: HTMLCanvasElement,
  width: number,
  height: number,
  scale = 3
) {
  const dpr = window.devicePixelRatio || 1;
  const ratio = dpr * scale;

  // canvas.style.width = width + "px";
  // canvas.style.height = height + "px";
  canvas.width = width * ratio;
  canvas.height = height * ratio;

  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(ratio, ratio);

  return ctx;
}