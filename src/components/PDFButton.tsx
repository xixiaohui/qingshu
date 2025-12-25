"use client";

import { jsPDF } from "jspdf";

import { Button, Typography } from "@mui/material";
import { CardItem } from "./test/MainContentCard";
import { NotoSansTC } from "../fonts/NotoSansTC-Regular";
import { Oswald } from "../fonts/Oswald-VariableFont_wght";
import { Download } from "@mui/icons-material";

function detectLanguage(text: string): "english" | "chinese" {
  // 繁体/简体中文 Unicode 范围：\u4e00-\u9fff
  const chineseRegex = /[\u4e00-\u9fff]/;
  return chineseRegex.test(text) ? "chinese" : "english";
}

export default function PDFButton({ blog }: { blog: CardItem }) {
  const handleDownload = () => {
    if (!blog.content?.trim()) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 50;
    const maxWidth = pageWidth - margin * 2;

    const isChinese = detectLanguage(blog.content) === "chinese";

    if (isChinese) {
      doc.addFileToVFS(
        "NotoSansTC-Regular-normal.ttf",
        NotoSansTC["NotoSansTC-Regular"]
      );
      doc.addFont(
        "NotoSansTC-Regular-normal.ttf",
        "NotoSansTC-Regular",
        "normal"
      );
      doc.setFont("NotoSansTC-Regular", "normal");
    } else {
      doc.addFileToVFS(
        "Oswald-VariableFont_wght-normal.ttf",
        Oswald["Oswald-VariableFont_wght"]
      );
      doc.addFont(
        "Oswald-VariableFont_wght-normal.ttf",
        "Oswald-VariableFont_wght",
        "normal"
      );
      doc.setFont("Oswald-VariableFont_wght", "normal");
    }

    let y = margin;
    doc.setFontSize(18);
    doc.text(blog.title, margin, y);
    y += 25;

    doc.setFontSize(12);
    doc.text(blog.authors[0].name, margin, y);
    y += 20;

    const paragraphs = blog.content.split("\n\n");
    const lineHeight = 22;

    paragraphs.forEach((para) => {
      const lines = doc.splitTextToSize(para, maxWidth);
      lines.forEach((line: string) => {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight;
      });
      y += lineHeight; // 段落间隔
    });

    doc.save(`${blog.title}.pdf`);
  };

  return (
    <Button variant="contained" onClick={handleDownload}>
      <Download />
      <Typography variant="body2" gutterBottom>下載 pdf</Typography>
        
    </Button>
  );
}
