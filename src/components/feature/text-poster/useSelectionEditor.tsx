import { BlogMark } from "@/lib/util";
import { useEffect, useRef, useState } from "react";

export interface TextSelection {
  text: string;
  rect: DOMRect;
  start?: number;
  end?: number;
}

export type EditorMode = "poster" | "highlight" | "note" | "share" | null;

export function useTextSelectionPoster() {
  const [selection, setSelection] = useState<TextSelection | null>(null);
  const [mode, setMode] = useState<EditorMode>(null);

  const modeRef = useRef<EditorMode>(mode);

  // 👇 保证 ref 永远是最新值
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (modeRef.current) return;

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return setSelection(null);

      const text = sel.toString().trim();
      if (!text) return setSelection(null);

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // 通过全文计算 start/end
      const fullText = 
      
      console.log("text is",text);
      console.log("rect is",rect);
      setSelection({ text, rect });


    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return {
    selection,
    mode,
    /** 打开海报 */
    openPoster: () => setMode("poster"),

    /** 打开摘要 */
    openHighlight: () => {
      setMode("highlight");
      // highlightSelection("#ffe58f");
    },

    /** 关闭一切 */
    closeEditor: () => {
      setMode(null);
      setSelection(null);
    },
  };
}


// export function highlightSelection(color = "#fff3a0") {
//   const sel = window.getSelection();
//   if (!sel || sel.rangeCount === 0) return;

//   const range = sel.getRangeAt(0);
//   if (range.collapsed) return;

//   const content = range.extractContents();

//   const span = document.createElement("span");
//   span.style.backgroundColor = color;
//   span.style.borderRadius = "2px";
//   span.style.padding = "0 2px";
//   span.dataset.highlight = "true";

//   span.appendChild(content);
//   range.insertNode(span);

//   sel.removeAllRanges();
// }

export function renderTextWithMarks(
  text: string,
  pageStart: number,
  marks: BlogMark[]
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  const relevant = marks
    .filter(m => m.end > pageStart && m.start < pageStart + text.length)
    .sort((a, b) => a.start - b.start);

  for (const mark of relevant) {
    const start = Math.max(mark.start - pageStart, 0);
    const end = Math.min(mark.end - pageStart, text.length);

    if (start > cursor) {
      nodes.push(text.slice(cursor, start));
    }

    nodes.push(
      <span
        key={`${mark.id}-${start}`}
        style={{
          backgroundColor:
            mark.style === "highlight" ? mark.bg_color : undefined,
          textDecoration:
            mark.style === "underline" ? "underline" : undefined,

        }}
      >
        {text.slice(start, end)}
      </span>
    );

    cursor = end;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return nodes;
}
