import type { Metadata } from "next";
import { getBlog } from "@/lib/getBlog";

import BlogClient from "@/components/BlogClient";

// 临时缓存 Map（同一次请求内）
const blogCache = new Map<string, any>();

async function getBlogCached(id: string) {
  if (blogCache.has(id)) return blogCache.get(id);
  const post = await getBlog(id);
  blogCache.set(id, post);
  return post;
}




// ---seo---

export async function generateMetadata({ params }: { params: Promise<{ id: string }> })
{

  const { id } = await params;

  console.log("slug is ",id);
  
  // const post = await getBlog(id);
  const post = await getBlogCached(decodeURIComponent(id));

  if (!post) {
    return {
      title: "文章不存在｜情书",
      description: "你要找的这篇情书，可能已经被风带走了。",
    };
  }

  const description = post.content
    ?.replace(/<[^>]+>/g, "")
    .slice(0, 120);

  return {
    title: post.title,
    description,
    alternates: {
      canonical: `https://qingshu.shop/blog/${id}`,
    },
    openGraph: {
      type: "article",
      locale: "zh_TW",
      title: post.title,
      description,
      url: `https://qingshu.shop/blog/${id}`,
    },
  };
}

//---end seo---




export default async function BlogPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  console.log("id:", id);

  const post = await getBlogCached(decodeURIComponent(id));

  return (
    <>
      <BlogClient id={id} post={post}></BlogClient>
    </>
  );
}
