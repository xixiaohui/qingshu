import { useEffect, useRef, useState } from "react";

export interface TextSelection {
  text: string;
  rect: DOMRect;
}

type EditorMode = "poster" | "highlight" | "note" | "share" | null;

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
      highlightSelection("#ffe58f");
    },

    /** 关闭一切 */
    closeEditor: () => {
      setMode(null);
      setSelection(null);
    },
  };
}


export function highlightSelection(color = "#fff3a0") {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return;

  const range = sel.getRangeAt(0);
  if (range.collapsed) return;

  const content = range.extractContents();

  const span = document.createElement("span");
  span.style.backgroundColor = color;
  span.style.borderRadius = "2px";
  span.style.padding = "0 2px";
  span.dataset.highlight = "true";

  span.appendChild(content);
  range.insertNode(span);

  sel.removeAllRanges();
}