import { BlogMark } from "@/lib/util";
import React from "react";
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
      if (!sel || sel.rangeCount === 0) {
        console.log("-----------------1")
        return setSelection(null);
      }

      const text = sel.toString().trim();
      if (!text) {
        console.log("-----------------2")
        return setSelection(null);
      }

      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // 通过全文计算 start/end

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
      console.log("--------------------3");
      setSelection(null);
    },
  };
}

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

export function renderTextWithMarksSecond(
  children: React.ReactNode,
  pageStart: number,
  marks: BlogMark[],
  offsetRef = { current: pageStart }
): React.ReactNode {
  return React.Children.map(children, child => {
    // 1️⃣ 纯文本节点
    if (typeof child === "string") {
      const text = child;
      const startOffset = offsetRef.current;
      const endOffset = startOffset + text.length;

      const relevant = marks
        .filter(m => m.end > startOffset && m.start < endOffset)
        .sort((a, b) => a.start - b.start);

      offsetRef.current = endOffset;

      // 没有 mark，直接返回原 text（保持 TextNode）
      if (relevant.length === 0) {
        return text;
      }

      const nodes: React.ReactNode[] = [];
      let cursor = 0;

      for (const mark of relevant) {
        const start = Math.max(mark.start - startOffset, 0);
        const end = Math.min(mark.end - startOffset, text.length);

        if (start > cursor) {
          nodes.push(text.slice(cursor, start));
        }

        nodes.push(
          <span
            key={`${mark.id}-${startOffset}-${start}`}
            style={{
              backgroundColor:
                mark.style === "highlight" ? mark.bg_color : undefined,
              textDecoration:
                mark.style === "underline" ? "underline" : undefined,
            }}
            className="mark"
          >
            {text.slice(start, end)}
          </span>
        );

        cursor = end;
      }

      if (cursor < text.length) {
        nodes.push(text.slice(cursor));
      }

      return <>{nodes}</>;
    }

    // 2️⃣ React 元素：递归处理 children
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<{
        children?: React.ReactNode;
      }>;

      return React.cloneElement(element, {
        children: renderTextWithMarksSecond(
          element.props.children,
          pageStart,
          marks,
          offsetRef
        ),
      });
    }

    // 3️⃣ 其他节点
    return child;
  });
}