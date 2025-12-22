import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Competitor Book Scope",
  description: "Internal dashboard for monitoring competitor releases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
