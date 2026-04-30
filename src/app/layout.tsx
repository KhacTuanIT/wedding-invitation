import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anh & Binh - Thiệp Cưới",
  description:
    "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Anh & Binh.",
  keywords: ["wedding", "thiệp cưới", "Anh", "Binh", "lễ cưới", "tình yêu"],
  openGraph: {
    title: "Anh & Binh - Thiệp Cưới",
    description:
      "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Anh & Binh.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        {children}
        <div className="film-grain" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
      </body>
    </html>
  );
}
