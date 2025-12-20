import { BlogMark } from "@/lib/util";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";


interface BlogMarksLayerProps {
  rootRef: React.RefObject<HTMLElement | null>;
  marks: BlogMark[];
}

function getTextNodeByOffset(
  root: Node,
  offset: number
): { node: Text; offset: number } | null {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    null
  );

  let currentOffset = 0;
  let node: Text | null = null;

  while ((node = walker.nextNode() as Text)) {
    const len = node.textContent?.length ?? 0;

    if (currentOffset + len >= offset) {
      return {
        node,
        offset: offset - currentOffset,
      };
    }

    currentOffset += len;
  }

  return null;
}


function createRangeFromOffsets(
  root: HTMLElement,
  start: number,
  end: number
): Range | null {
  const startPos = getTextNodeByOffset(root, start);
  const endPos = getTextNodeByOffset(root, end);

  if (!startPos || !endPos) return null;

  const range = document.createRange();
  range.setStart(startPos.node, startPos.offset);
  range.setEnd(endPos.node, endPos.offset);

  return range;
}

function hexToRgba(hex: string, alpha = 0.3) {
  let c = hex.replace("#", "");

  if (c.length === 3) {
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  }

  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}


function MarkOverlay({
  rects,
  mark,
}: {
  rects: DOMRect[];
  mark: BlogMark;
}) {
  const bg = hexToRgba(mark.bg_color, 0.28);

  return (
    <>
      {rects.map((rect, i) => (
        <Box
          key={i}
          sx={{
            position: "fixed",
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,

            pointerEvents: "none",
            zIndex: 1200,
            borderRadius: 0.5,
            boxSizing: "border-box",

            ...(mark.style === "highlight"
              ? {
                  backgroundColor: bg,
                }
              : {
                  borderBottom: `2px solid ${bg}`,
                }),
          }}
        />
      ))}
    </>
  );
}


export function BlogMarksLayer({
  rootRef,
  marks,
}: BlogMarksLayerProps) {
  const [rectMap, setRectMap] = useState<
    Record<string, DOMRect[]>
  >({});

  useEffect(() => {
    if (!rootRef.current) return;
    if (!marks?.length) {
      setRectMap({});
      return;
    }

    const nextMap: Record<string, DOMRect[]> = {};

    for (const mark of marks) {
      const range = createRangeFromOffsets(
        rootRef.current,
        mark.start,
        mark.end
      );

      if (!range) continue;

      nextMap[mark.id] = Array.from(
        range.getClientRects()
      );
    }

    setRectMap(nextMap);
  }, [marks, rootRef]);

  // 窗口 resize 时重新计算（非常重要）
  useEffect(() => {
    const handleResize = () => {
      if (!rootRef.current) return;

      const nextMap: Record<string, DOMRect[]> = {};

      for (const mark of marks) {
        const range = createRangeFromOffsets(
          rootRef.current,
          mark.start,
          mark.end
        );
        if (!range) continue;
        nextMap[mark.id] = Array.from(
          range.getClientRects()
        );
      }

      setRectMap(nextMap);
    };

    window.addEventListener("resize", handleResize);
    return () =>
      window.removeEventListener("resize", handleResize);
  }, [marks, rootRef]);

  return (
    <>
      {marks.map((mark) => (
        <MarkOverlay
          key={mark.id}
          mark={mark}
          rects={rectMap[mark.id] ?? []}
        />
      ))}
    </>
  );
}