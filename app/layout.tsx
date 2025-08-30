import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scheme-only-dark">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <NextTopLoader color="#b05976" />
        {children}

        <Toaster closeButton />
      </body>
    </html>
  );
}
