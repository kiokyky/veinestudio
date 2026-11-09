import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VEINE STUDIO — Indie Game Crafter & Creative Web Engineer",
  description:
    "Personal identity & creative studio of Veine. Crafting playable worlds, indie games, and kinetic web experiences.",
  keywords: [
    "Veine Studio",
    "Game Developer Portfolio",
    "Creative Developer",
    "Next.js Portfolio",
    "Indie Game Studio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-syne: 'Syne', system-ui, -apple-system, sans-serif;
            --font-space-grotesk: 'Space Grotesk', system-ui, -apple-system, sans-serif;
            --font-jetbrains-mono: 'JetBrains Mono', monospace;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased veine-bg-grid selection:bg-veine-aqua selection:text-veine-navy">
        {children}
      </body>
    </html>
  );
}

