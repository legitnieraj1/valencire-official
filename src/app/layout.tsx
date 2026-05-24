import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";

const optiRadiant = localFont({
  src: [
    { path: "../../public/images/font/OPTIRadiant-Medium.otf", weight: "500" },
    { path: "../../public/images/font/OPTIRadiant-Bold.otf", weight: "700" },
    { path: "../../public/images/font/OPTIRadiant-ExtraBold.otf", weight: "800" },
  ],
  variable: "--font-radiant",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-snell",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valenciré | Official Online Site and Store",
  description:
    "Shop the latest from Valenciré. Free shipping on orders over $75. Official Valenciré online store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${optiRadiant.variable} ${cormorantGaramond.variable} ${dancingScript.variable}`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
