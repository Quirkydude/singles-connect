import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: 'Singles Connect Conference 2026 — Assin Fosu Area',
    template: '%s | SCC 2026',
  },
  description:
    'Register for the Singles Connect Conference 2026 — Assin Fosu Area, The Church of Pentecost. Thur. 30th April – Sat. 2nd May 2026. Theme: Love, Singleness and Marriage.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
