"use client";

import Box from "@mui/material/Box";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { useMediaQuery, useTheme } from "@mui/material";

import { Fira_Code } from "next/font/google";
import { Noto_Serif_TC } from "next/font/google";

// 英文字体
const fira = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-en",
});

// 中文字体
const notoSerif = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cn",
});


function BlogContentMoblie({ content }: { content: string }) {
  return (
    <>
      <Box
        sx={{
          // 基础排版
          fontFamily: `${fira.style.fontFamily}, ${notoSerif.style.fontFamily}, monospace`,
          fontSize: { xs: "1.05rem", sm: "1.1rem" }, // ← 手机更大一点
          lineHeight: { xs: 1.95, sm: 1.85 }, // ← 中文更舒适的行距
          color: "#373737",
          px: { xs: 1, sm: 2 }, // ← 手机保留留白

          // 段落
          "& p": {
            marginBottom: "1.2em",
            textAlign: "justify",
            wordBreak: "break-word",
          },

          // 标题视觉更轻、更适合小屏
          "& h1": {
            fontSize: { xs: "1.55rem", sm: "1.7rem" },
            fontWeight: 700,
            mt: 3,
            mb: 1.5,
            lineHeight: 1.35,
          },
          "& h2": {
            fontSize: { xs: "1.35rem", sm: "1.5rem" },
            fontWeight: 600,
            mt: 3,
            mb: 1.5,
            lineHeight: 1.4,
          },
          "& h3": {
            fontSize: { xs: "1.2rem", sm: "1.3rem" },
            fontWeight: 600,
            mt: 2.5,
            mb: 1.2,
            lineHeight: 1.45,
          },

          // 列表更紧凑适合手机
          "& ul, & ol": {
            paddingLeft: "1.4em",
            marginBottom: "1.2em",
            lineHeight: 1.9,
          },
          "& li": { marginBottom: "0.4em" },

          // 链接
          "& a": {
            color: "primary.main",
            textDecoration: "none",
            fontWeight: 500,
            "&:active": { opacity: 0.7 },
            "&:hover": { textDecoration: "underline" },
          },

          // 图片优化（圆角 + 轻阴影 + 间距）
          "& img": {
            maxWidth: "100%",
            display: "block",
            margin: "16px 0",
            borderRadius: "12px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
          },

          // 引用块更简洁，不占空间
          "& blockquote": {
            borderLeft: "3px solid #90caf9",
            paddingLeft: "12px",
            margin: "16px 0",
            color: "text.secondary",
            fontStyle: "italic",
            lineHeight: 1.8,
          },

          // 行间代码
          "& code": {
            background: "rgba(0,0,0,0.05)",
            padding: "2px 5px",
            borderRadius: "4px",
            fontSize: "0.9rem",
            fontFamily: "monospace",
          },

          whiteSpace: "pre-wrap",
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
      </Box>
    </>
  );
}

function BlogContentPC({ content }: { content: string }) {
  return (
    <Box
      
      sx={{
        lineHeight: 1.2,
        color: "#373737",

        // 英文 → Fira Code
        // 中文 → Noto Serif TC
        fontFamily: `
          ${fira.style.fontFamily},
          ${notoSerif.style.fontFamily},
          sans-serif
        `,
        fontSize: { xs: "1.05rem", sm: "1.2rem" },
        fontWeight: 500,

        "& p": {
          marginBottom: "1.2em",
          textAlign: "justify",
        },

        // 标题：固定使用 Noto Sans TC
        "& h1, & h2, & h3": {
          fontFamily: `${notoSerif.style.fontFamily}, sans-serif`,
          fontWeight: 600,
        },
        "& h1": { fontSize: "1.75rem", mt: 4, mb: 2 },
        "& h2": { fontSize: "1.5rem", mt: 3, mb: 2 },
        "& h3": { fontSize: "1.3rem", mt: 3, mb: 1.5 },

        "& ul, & ol": {
          paddingLeft: "1.4em",
          marginBottom: "1.2em",
          lineHeight: 1.9,
        },
        "& li": { marginBottom: "0.4em" },

        "& a": {
          color: "primary.main",
          textDecoration: "none",
          fontWeight: 500,
          "&:hover": { textDecoration: "underline" },
        },

        "& img": {
          maxWidth: "100%",
          borderRadius: "10px",
          margin: "20px 0",
          display: "block",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        },

        "& blockquote": {
          borderLeft: "4px solid #90caf9",
          paddingLeft: "16px",
          margin: "20px 0",
          color: "text.secondary",
          fontStyle: "italic",
        },

        "& code": {
          background: "rgba(0,0,0,0.05)",
          padding: "2px 6px",
          borderRadius: "6px",
          fontSize: "0.9rem",
          fontFamily: `${fira.style.fontFamily}, monospace`,
        },

        whiteSpace: "pre-wrap",
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkBreaks]}>{content}</ReactMarkdown>
    </Box>
  );
}

export default function BlogContentCardUseMarkdown({
  content,
}: {
  content: string;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isMobile ? (
        <BlogContentMoblie content={content} />
      ) : (
        <BlogContentPC content={content} />
      )}
    </>
  );
}
