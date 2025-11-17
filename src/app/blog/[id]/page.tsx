"use client";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";

import BlogContentStyle1 from "@/components/BlogContentStyle1";
import { useParams } from "next/navigation";
import BlogContentStyle2 from "@/components/BlogContentStyle2";
import { useMediaQuery, useTheme } from "@mui/system";
import theme from "@/theme";

type BlogStyleType = "style1" | "style2";

const components: Record<BlogStyleType, React.FC<{ identifier: string }>> = {
  style1: BlogContentStyle1,
  style2: BlogContentStyle2,
};

const BlogContent = ({
  type,
  identifier,
}: {
  type: BlogStyleType;
  identifier: string;
}) => {
  const style = {
    style1: () => (
      <BlogContentStyle1 identifier={identifier}></BlogContentStyle1>
    ),
    style2: () => (
      <BlogContentStyle2 identifier={identifier}></BlogContentStyle2>
    ),
  };

  const RenderComponent = style[type];

  return RenderComponent ? <RenderComponent /> : <></>;
};

const typeByScreen = {
  xs: "style1",
  sm: "style1",
  md: "style2",
  lg: "style2",
  xl: "style2",
} as const;

export default function BlogPage() {
  const params = useParams(); // 👈 获取到博客ID
  const identifier = params?.id ?? "unknown"; // 防止 undefined

  const theme = useTheme();

  // 依照 MUI breakpoints 逐级判断
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  let type: string = typeByScreen.xs; // 默认值

  if (isSm) type = typeByScreen.sm;
  if (isMd) type = typeByScreen.md;
  if (isLg) type = typeByScreen.lg;
  if (isXl) type = typeByScreen.xl;

  return (
    <>
      <AppAppBar />
      <BlogContent
        type={type as BlogStyleType}
        identifier={identifier as string}
      ></BlogContent>
      <Footer />
    </>
  );
}
