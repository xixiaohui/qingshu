
import { useState, useRef, useEffect } from "react";
import { EditorMode, TextSelection } from "./useSelectionEditor";


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


  useEffect(() => {
  

    const handleMouseUp = (e:any) => {
      console.log(selection);
      console.log("-------useTextSelectionInfo-------------");

      if (modeRef.current) {

        return;
      };

      const container = containerRef.current;
      if (!container) {
        return;
      };

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0){
        return;
      }

      const range = sel.getRangeAt(0);
      if (range.collapsed) {
        return;
      }

      const text = sel.toString().trim();
      if (!text) {
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

      const selectionUse = {
        text,
        start,
        end,
        rect: range.getBoundingClientRect(),
      };
      setSelection(selectionUse);
      console.log(selection);
      console.log("-------70------------");
    };

    console.log(selection);
    console.log("-------7------------");

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
      console.log("highlight");
      console.log(selection);
    },

    closeEditor: () => {
      console.log("--------------------4");
      setMode(null);
      setSelection(null);
    },
    clearSelection: () => {
      console.log("--------------------5-----------");
      window.getSelection()?.removeAllRanges();
      setSelection(null);
      setMode(null);
    },
  };
}
