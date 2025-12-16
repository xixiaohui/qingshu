import { useEffect, useState } from "react";

export interface TextSelection {
  text: string;
  rect: DOMRect;
}

export function useTextSelectionEditor() {
  const [selection, setSelection] = useState<TextSelection | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleMouseUp = () => {
      if (open) return;

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
    selection:selection,
    open:open,
    openEditor: () => {
      console.log("打开摘要编辑");
      setOpen(true)
    },
    closeEditor: () => setOpen(false),
  };
}
