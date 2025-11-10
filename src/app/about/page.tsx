"use client";
import * as React from "react";

import NextLink from "next/link";
import ProTip from "@/components/ProTip";
import Copyright from "@/components/Copyright";
import AppTheme from "@/shared-theme/AppTheme";
import { CssBaseline } from "@mui/material";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";
import Hero from "@/components/homepage/Hero";


import { Box, Container, Typography, Button, Grid, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

const discribtion = [
  `🌹 平台简介

「让人重新相信文字里的爱」 是一个专注于 文字表达与情感共鸣 的社交平台。
我们相信，真正的情感不需要滤镜与算法推荐，而是藏在一个人真诚的文字、细腻的表达与耐心的倾听中。
在这个平台上，人们用文字重新学习去表达、去理解、去靠近彼此的心。`,
  `💌 核心理念

用文字连接灵魂，用理解唤醒爱。

在快节奏、碎片化的时代，我们希望提供一个「慢社交」的空间。
这里没有刷不完的短视频，也没有虚浮的标签，只有 真实的情绪、温柔的故事与用心的回复。

每一个字句，都可能成为人与人之间重新理解爱的契机。`,
  `🌿 核心功能
1. ✍️ 情感日记

记录你想说却没能说出口的心事。
支持私密写作与公开分享，让文字成为疗愈自己的方式。

2. 💬 共感信箱

用户可以匿名寄出一封信，由系统匹配到“最有共鸣”的陌生人。
不是速配，而是心灵共振的邂逅。

3. 🕊️ 爱的语录图书馆

每日推荐真实用户的文字片段、诗句或故事，形成一个“治愈系语录墙”。
读文字，就像读懂一个人。

4. 💗 心灵共读圈

主题化的写作与共读社区，如「异地恋的信」「分手的勇气」「重学温柔」等，
让每种情感都有被理解与被拥抱的空间。

5. 🌙 AI 共情助手

基于情感语义识别与生成模型，提供 共情式回复建议，帮助用户更好地表达与理解复杂的情绪。
不是冷冰冰的机器人，而是一个“懂你情绪温度”的朋友。`,
`🌸 平台愿景

我们希望：

让文字重新变得有力量；

让人们重新相信沟通可以修复与重建关系；

让“爱”不再只是符号或社交姿态，而是可以被表达、被倾听、被理解的真实存在。`,

`用户群体

在爱情、亲情、友情中寻求理解与疗愈的人；

喜欢用文字记录情绪与思考的表达者；

希望结识懂得沟通、尊重情感深度的同路人。`,

];

function AboutContent() {
  return (
    <>
      <Typography variant="h2" gutterBottom>
        关于情书
      </Typography>
      {discribtion.map((value,index)=>(
        <Typography variant="body2" key={index}>
          {value}
        </Typography>
      ))}
      
    </>
  );
}

export default function About() {
  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      
      <Container
        maxWidth="lg"
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 16,
          gap: 4,
        }}
      >
        <AboutContent></AboutContent>
        <Footer />
      </Container>
    </AppTheme>
  );
}


