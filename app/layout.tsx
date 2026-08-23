import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import { publicSans, vazirmatn } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Finance App",
  description: "Personal finance management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${publicSans.variable} ${vazirmatn.variable}`}>
      <body className="font-sans">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
