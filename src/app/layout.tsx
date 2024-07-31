import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { Metadata } from "next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital Zone",
  description: "𝐃𝐢𝐠𝐢𝐭𝐚𝐥𝐙𝐨𝐧𝐞 ~ 𝐆𝐚𝐦𝐞𝐬 & 𝐍𝐞𝐰𝐬",
  icons: "icon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content="https://digitalzone.vercel.app/" property="og:url" />
        <meta
          content="https://digitalzone.vercel.app/icon.png"
          property="og:image"
        />
        <meta content="#09090b" data-react-helmet="true" name="theme-color" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
