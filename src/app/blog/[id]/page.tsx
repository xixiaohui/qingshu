"use client";
import AppAppBar from "@/components/homepage/AppAppBar";
import Footer from "@/components/homepage/Footer";

import BlogContentStyle1 from "@/components/BlogContentStyle1";
import { useParams } from "next/navigation";
import BlogContentStyle2 from "@/components/BlogContentStyle2";

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

export default function BlogPage() {
  const params = useParams(); // 👈 获取到博客ID
  const identifier = params?.id ?? "unknown"; // 防止 undefined

  return (
    <>
      <AppAppBar />
      <BlogContent
        type="style2"
        identifier={identifier as string}
      ></BlogContent>
      <Footer />
    </>
  );
}
