import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata() {
  return {
    title: "Digital Zone",
    description: "𝐃𝐢𝐠𝐢𝐭𝐚𝐥𝐙𝐨𝐧𝐞 ~ 𝐆𝐚𝐦𝐞𝐬 & 𝐍𝐞𝐰𝐬",
    other: { "theme-color": "#09090b" },
    openGraph: {
      url: `https://digitalzone.vercel.app/`,
      images: [
        {
          url: "https://github.com/god0654/games.json/blob/main/icon.png?raw=true",
        },
      ],
    },
    icons: "https://github.com/god0654/games.json/blob/main/icon.png?raw=true",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
        suppressHydrationWarning
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
