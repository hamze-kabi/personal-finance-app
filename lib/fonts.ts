import localFont from "next/font/local";

// Public Sans Variable Font
export const publicSans = localFont({
  src: [
    {
      path: "../public/fonts/PublicSans-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/PublicSans-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-public-sans",
  display: "swap",
});

// Vazirmatn Variable Font
export const vazirmatn = localFont({
  src: [
    {
      path: "../public/fonts/vazirmatn/Vazirmatn-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
});
