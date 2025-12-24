
import Providers from "./providers";
import Script from "next/script";
import type { Metadata } from "next";

import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://qingshu.shop"),
  title: {
    default: "情书｜写给没说出口的爱",
    template: "%s｜情书",
  },
  description:
    "情书 qingshu.shop，一个为台湾与香港用户打造的繁体中文情感文字网站。",
  openGraph: {
    siteName: "情书",
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
