"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/supabaseClient";

import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import BorderColorIcon from "@mui/icons-material/BorderColor"; // 高亮
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined"; // 下划线

interface Props {
  blogId: number;
  content: string;
}

export default function BlogContentAnnotation({ blogId, content }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // 加载批注
  useEffect(() => {
    const loadAnnotations = async () => {
      const { data } = await supabase
        .from("annotations")
        .select("*")
        .eq("blog_id", blogId);

      setAnnotations(data || []);
    };

    loadAnnotations();
  }, [blogId]);

  // 鼠标松开时检测选区
  const handleMouseUp = (e: any) => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) {
      setAnchorEl(null);
      return;
    }

    const range = sel.getRangeAt(0);
    if (range.collapsed) {
      setAnchorEl(null);
      return;
    }

    setSelectionRange(range);
    setAnchorEl(e.target as HTMLElement);
  };

  // 添加批注
  const addAnnotation = async (type: "highlight" | "underline") => {
    if (!selectionRange) return;

    const selectedText = selectionRange.toString();
    const fullText = content;

    const startOffset = fullText.indexOf(selectedText);
    const endOffset = startOffset + selectedText.length;

    const { data } = await supabase
      .from("annotations")
      .insert([
        {
          blog_id: blogId,
          content: selectedText,
          start_offset: startOffset,
          end_offset: endOffset,
          type,
        },
      ])
      .select();

    setAnnotations((prev) => [...prev, data![0]]);

    setAnchorEl(null);
    window.getSelection()?.removeAllRanges();
  };

  // 渲染含批注的 HTML
  const renderAnnotatedContent = () => {
    let html = content;

    annotations.forEach((a) => {
      const start = `<span class="anno-${a.type}">`;
      const end = "</span>";

      html =
        html.slice(0, a.start_offset) +
        start +
        html.slice(a.start_offset, a.end_offset) +
        end +
        html.slice(a.end_offset);
    });

    return html;
  };

  return (
    <div style={{ position: "relative" }}>
      {/* 浮动工具栏（MUI Popper） */}
      <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="top">
        <Paper
          elevation={4}
          sx={{
            p: 1,
            borderRadius: 2,
            display: "flex",
            gap: 1,
            bgcolor: "background.paper",
          }}
        >
          <Tooltip title="高亮">
            <IconButton
              color="warning"
              onClick={() => addAnnotation("highlight")}
            >
              <BorderColorIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="下划线">
            <IconButton color="primary" onClick={() => addAnnotation("underline")}>
              <FormatUnderlinedIcon />
            </IconButton>
          </Tooltip>
        </Paper>
      </Popper>

      {/* 内容区域 */}
      <div ref={containerRef} onMouseUp={handleMouseUp}>
        <ReactMarkdown>{renderAnnotatedContent()}</ReactMarkdown>
      </div>

      <style jsx>{`
        .anno-highlight {
          background-color: #fff59d;
        }
        .anno-underline {
          text-decoration: underline;
          text-decoration-color: #1976d2;
          text-underline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
