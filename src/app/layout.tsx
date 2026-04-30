import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sỹ & A - Thiệp Cưới",
  description:
    "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Sỹ & A.",
  keywords: ["wedding", "thiệp cưới", "Sỹ", "A", "lễ cưới", "tình yêu"],
  openGraph: {
    title: "Sỹ & A - Thiệp Cưới",
    description:
      "Trân trọng kính mời bạn đến chung vui trong lễ cưới của Sỹ & A.",
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
