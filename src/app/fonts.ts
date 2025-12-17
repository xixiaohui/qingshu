import localFont from "next/font/local";

export const notoSerifTC = localFont({
  src: [
    {
      path: "./fonts/NotoSerifTC-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

export const firaCode = localFont({
  src: [
    {
      path: "./fonts/FiraCode-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-fira-code",
  display: "swap",
});
