import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUBIT Digital — Ideas into digital experiences",
  description:
    "LUBIT Digital is a creative technology studio building expressive websites, e-commerce experiences and custom digital products.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "LUBIT Digital",
    description: "Ideas into digital experiences.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090812",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
