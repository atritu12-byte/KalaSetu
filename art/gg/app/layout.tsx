import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KalaSetu - AI-Powered Marketplace for Traditional Artisans",
  description: "A voice-first, multi-lingual platform that helps traditional artisans create digital product listings and reach wider markets through AI technology.",
  keywords: ["traditional crafts", "artisans", "AI marketplace", "voice interface", "handmade", "cultural heritage"],
  authors: [{ name: "KalaSetu Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>" />
      </head>
      <body>{children}</body>
    </html>
  );
}
