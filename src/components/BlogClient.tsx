"use client";
import AppAppBar from "./homepage/AppAppBar";
import Footer from "./homepage/Footer";

import BlogContentStyle1 from "./BlogContentStyle1";
import BlogContentStyle2 from "./BlogContentStyle2";
import BlogContentStyle3 from "./BlogContentStyle3";
import { useMediaQuery, useTheme } from "@mui/system";
import { CardItem } from "./test/MainContentCard";
import BlogContentStyle4 from "./BlogContentStyle4";

type BlogStyleType = "style1" | "style2" | "style3" | "style4";

const components: Record<BlogStyleType, React.FC<{ identifier: string ,post:CardItem}>> = {
  style1: BlogContentStyle1,
  style2: BlogContentStyle2,
  style3: BlogContentStyle3,
  style4: BlogContentStyle4,
};

const BlogContent = ({
  type,
  identifier,
  post
}: {
  type: BlogStyleType;
  identifier: string;
  post:CardItem;
}) => {
  const style = {
    style1: () => (
      <BlogContentStyle1 identifier={identifier}></BlogContentStyle1>
    ),
    style2: () => (
      <BlogContentStyle2 identifier={identifier}></BlogContentStyle2>
    ),
    style3: () => (
      <BlogContentStyle3 identifier={identifier} post={post}></BlogContentStyle3>
    ),
    style4: () => (
      <BlogContentStyle4 identifier={identifier} post={post}></BlogContentStyle4>
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
  xl: "style4",
} as const;

export default function BlogClient({ id ,post}: { id: string,post:CardItem }) {
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
        identifier={id}
        post={post}
      ></BlogContent>
      <Footer />
    </>
  );
}
