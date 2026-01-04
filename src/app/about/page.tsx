"use client";
import * as React from "react";

import NextLink from "next/link";
import ProTip from "@/components/ProTip";
import Copyright from "@/components/Copyright";
import AppTheme from "@/shared-theme/AppTheme";
import { CssBaseline, Link } from "@mui/material";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { motion } from "framer-motion";
import FramePage from "@/components/Frame";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const discribtion = [
  `🌹 平台簡介

「讓人重新相信文字裡的愛」 是一個專注於 文字表達與情感共鳴 的社群平台。
我們相信，真正的情感不需要濾鏡與演算法推薦，而是藏在一個人真誠的文字、細膩的表達與耐心的傾聽中。
在這個平台上，人們用文字重新學習去表達、去理解、去靠近彼此的心。 `,
 `💌 核心理念

用文字連結靈魂，用理解喚醒愛。

在快節奏、碎片化的時代，我們希望提供一個「慢社交」的空間。
這裡沒有刷不完的短視頻，也沒有虛浮的標籤，只有 真實的情緒、溫柔的故事與用心的回复。

每一個字句，都可能成為人與人之間重新理解愛的契機。 `,
 `🌿 核心功能
1. ✍️ 情感日記

記錄你想說卻沒能說出口的心事。
支持私密寫作與公開分享，讓文字成為療癒自己的方式。

2. 💬 共感信箱

用戶可以匿名寄出一封信，由系統與「最有共鳴」的陌生人配對。
不是速配，而是心靈共振的邂逅。

3. 🕊️ 愛的語錄圖書館

每日推薦真實使用者的文字片段、詩句或故事，形成一個「治癒系語錄牆」。
讀文字，就像讀懂一個人。

4. 💗 心靈共讀圈

主題化的寫作與共讀社區，如「異地戀的信」「分手的勇氣」「重學溫柔」等，
讓每種情感都有被理解與被擁抱的空間。

5. 🌙 AI 共感助手

基於情緒語意辨識與生成模型，提供 共感式回覆建議，幫助使用者更好地表達與理解複雜的情緒。
不是冷冰冰的機器人，而是一個「懂你情緒溫度」的朋友。 `,
 `🌸 平台願景

我們希望：

讓文字重新變得有力量；

讓人們重新相信溝通可以修復與重建關係；

讓「愛」不再只是符號或社交姿態，而是可以被表達、被傾聽、被理解的真實存在。 `,

 `使用者群體

在愛情、親情、友情中尋求理解與療癒的人；

喜歡用文字記錄情緒與思考的表達者；

希望認識懂得溝通、尊重情感深度的同路人。`,
];

function AboutContent() {
  return (
    <>
      <Typography variant="h2" color="primary" gutterBottom>
        關於我們
      </Typography>
      {discribtion.map((value, index) => (
        <Typography variant="body2" key={index}>
          {value}
        </Typography>
      ))}
    </>
  );
}

function AboutQS() {
  
  const [totalCount, setTotalCount] = useState(0);

  async function fetchCount() {
    const { count } = await supabase
      .from("blogs")
      .select("id", { count: "estimated"});

    if (count) setTotalCount(count);
  }
  useEffect(() => {
    fetchCount();
  }, []);
  
  return (
    <>
      <Typography variant="h2" gutterBottom color="primary">
        收錄{totalCount}条QS
      </Typography>
      <Link href="/all">看全部QS</Link>
      <Link href="/filter">熱門搜尋</Link>
    </>
  );
}

export default function About() {
  return (
    <FramePage>
      <AboutContent></AboutContent>
      <AboutQS></AboutQS>
    </FramePage>
  );
}
