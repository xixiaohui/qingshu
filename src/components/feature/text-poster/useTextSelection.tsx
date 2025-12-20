import { MyPage } from "@/components/LongTextPaginationTwo";
import { BlogMark } from "@/lib/util";
import { useState, useRef, useEffect } from "react";
import { EditorMode, TextSelection } from "./useSelectionEditor";

export function useTextSelection(page: MyPage | null, blogId: number) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [selection, setSelection] = useState<BlogMark | null>(null);

  const highlightSelection = (
    bg_color = "#ffe58f",
    style: "highlight" | "underline" = "highlight"
  ) => {
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

    const walker = document.createTreeWalker(
      container,
      NodeFilter.SHOW_TEXT,
      null
    );

    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const len = node.textContent?.length ?? 0;

      if (node === range.startContainer)
        start = page.start + cursor + range.startOffset;
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

      console.log("---handleMouseUp-----------1");

      const selIndex = getSelectionIndex(containerRef.current, page);
      if (!selIndex) return;

      console.log("---handleMouseUp-----------2");

      const selText = window.getSelection()?.toString().trim();
      if (!selText) return;

      console.log("---handleMouseUp-----------3");

      const newMark: BlogMark = {
        id: crypto.randomUUID(),
        blog_id: blogId,
        start: selIndex.start,
        end: selIndex.end,
        bg_color: "#ffe58f",
        style: "highlight",
        excerpt: selText,
        created_at: new Date().toISOString(),
      };

      console.log("---handleMouseUp-----------4");
      console.log(newMark);

      setSelection(newMark);

      // 立即在页面显示高亮
      // highlightSelection(newMark.bg_color, newMark.style);

      // 存到 Supabase
      // saveHighlight(newMark);

      console.log("---handleMouseUp-----------5");
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [page]);

  return { containerRef, selection, setSelection };
}

export function getSelectionIndex(container: HTMLElement, page: MyPage) {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return null;

  let start = -1;
  let end = -1;
  let cursor = 0;

  // 遍历当前 container 的所有 text node
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const len = node.textContent?.length ?? 0;

    if (node === range.startContainer) {
      start = page.start + cursor + range.startOffset;
    }

    if (node === range.endContainer) {
      end = page.start + cursor + range.endOffset;
      break;
    }

    cursor += len;
  }

  if (start === -1 || end === -1) return null;
  return { start, end };
}

export function clearSelection() {
  const sel = window.getSelection?.();
  if (!sel) return;

  if (sel.removeAllRanges) {
    sel.removeAllRanges();
  } else if ((sel as any).empty) {
    // Safari / 老浏览器
    (sel as any).empty();
  }
}

function clearBrowserSelection() {
  const sel = window.getSelection();
  if (!sel) return;
  sel.removeAllRanges();
}

export function useTextSelectionInfo(
  containerRef: React.RefObject<HTMLElement | null>,
  content: { text: string }
) {
  // const [selection, setSelection] = useState<TextSelection | null>(null);
  const [mode, setMode] = useState<EditorMode>(null);
  const modeRef = useRef<EditorMode>(mode);
  const [selection,setSelection] = useState<TextSelection | null>(null);

  // 保证 ref 永远最新
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  const clearSlection = ()=>{
      // setSelection(null);
      // console.log('清空了selection');
  }

  useEffect(() => {
    const handleMouseUp = () => {

      if(mode != null){
        return;
      }

      if (modeRef.current) {
        clearSlection();
        return;
      };

      const container = containerRef.current;
      if (!container) {
        clearSlection();
        return;
      };

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0){
        clearSlection();
        return;
      }

      const range = sel.getRangeAt(0);
      if (range.collapsed) {
        clearSlection();
        return;
      }

      const text = sel.toString().trim();
      if (!text) {
        clearSlection();
        return;
      }

      let cursor = 0;
      let start = -1;
      let end = -1;

      const walker = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT,
        null
      );

      while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        const len = node.textContent?.length ?? 0;

        if (node === range.startContainer) {
          start = cursor + range.startOffset;
        }

        if (node === range.endContainer) {
          end = cursor + range.endOffset;
          break;
        }

        cursor += len;
      }

      if (start === -1 || end === -1) return;

      // selectionRef.current = {
      //   text,
      //   start,
      //   end,
      //   rect: range.getBoundingClientRect(),
      // };

      const selectionUse = {
        text,
        start,
        end,
        rect: range.getBoundingClientRect(),
      };
      setSelection(selectionUse);


     
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, [containerRef, content.text]);

  return {
    selection,

    mode,
    /** 打开海报 */
    openPoster: () => {
      setMode("poster");
      console.log("打开海报");
    },

    openHighlight: () => {
      setMode("highlight");
    },

    closeEditor: () => {
      console.log("--------------------4");
      setMode(null);
      setSelection(null);
    },
    clearSelection: () => {
      // console.log("--------------------5-----------");
      window.getSelection()?.removeAllRanges();
      setSelection(null);
    },
  };
}
