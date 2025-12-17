import { MyPage } from "@/components/LongTextPaginationTwo";
import { BlogMark } from "@/lib/util";
import { useState, useRef, useEffect } from "react";


// export interface TextSelection {
//   text: string;        // 用户选中的文字
//   start: number;       // 全文 start
//   end: number;         // 全文 end
//   color?: string;      // 高亮颜色，可选
// }


export function useTextSelection(page: MyPage | null) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [selection, setSelection] = useState<BlogMark  | null>(null);

  const highlightSelection = (bg_color = "#ffe58f", style: "highlight" | "underline" = "highlight") => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const range = sel.getRangeAt(0);
    if (range.collapsed) return;

    const content = range.extractContents();
    const span = document.createElement("span");

    if (style === "highlight") span.style.backgroundColor = bg_color;
    else if (style === "underline") span.style.textDecoration = "underline";

    span.dataset.highlight = "true";
    span.appendChild(content);
    range.insertNode(span);

    sel.removeAllRanges();
  };

  const getSelectionIndex = (container: HTMLElement, page: MyPage) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);
    if (range.collapsed) return null;

    let start = -1;
    let end = -1;
    let cursor = 0;

    const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const len = node.textContent?.length ?? 0;

      if (node === range.startContainer) start = page.start + cursor + range.startOffset;
      if (node === range.endContainer) {
        end = page.start + cursor + range.endOffset;
        break;
      }

      cursor += len;
    }

    if (start === -1 || end === -1) return null;
    return { start, end };
  };

  const saveHighlight = async (mark: BlogMark) => {
    try {
      await fetch("/api/blogMark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mark),
      });
    } catch (err) {
      console.error("保存高亮失败", err);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (!containerRef.current || !page) return;

      const selIndex = getSelectionIndex(containerRef.current, page);
      if (!selIndex) return;

      const selText = window.getSelection()?.toString().trim();
      if (!selText) return;

      const newMark: BlogMark = {
        id: crypto.randomUUID(),
        blog_id: 0,
        start: selIndex.start,
        end: selIndex.end,
        bg_color: "#ffe58f",
        style: "highlight",
        excerpt: selText,
        created_at: new Date().toISOString(),
      };


      setSelection(newMark);

      // 立即在页面显示高亮
      highlightSelection(newMark.bg_color, newMark.style);

      // 存到 Supabase
    //   saveHighlight(newMark);
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [page]);

  return { containerRef, selection, setSelection };
}