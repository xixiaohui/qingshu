import { Analytics } from "@vercel/analytics/next"
import Providers from "./providers";
import Script from "next/script";
import type { Metadata } from "next";

import "./globals.css";

export const metadata :Metadata = {
  metadataBase: new URL("https://qingshu.shop"),
  title: {
    default: "情書｜寫給沒說出口的愛｜情書大全｜情感表達｜分享社交｜理解與共鳴｜文藝青年",
    template: "%s｜情書",
  },
  description:
    "情書 qingshu.shop,讓人重新相信文字裡的愛! 一個專注於表達與理解愛情的社交平台。",
  openGraph: {
    siteName: "情書",
    locale: "zh_TW",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-6634656437365032",
  },
 
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW"
      suppressHydrationWarning
    >
       <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6634656437365032"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>

      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
