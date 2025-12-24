"use client";

import { useEffect } from "react";

type Props = {
  adClient: string;
  adSlot: string;
  style?: React.CSSProperties;
};

export default function Adsense({ adClient, adSlot, style }: Props) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsense push error:", e);
    }
  }, []);

  return (
    <>
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center", ...style }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-layout="in-article"
        data-ad-format="fluid"
      />
    </>
  );
}

