import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import SocketProvider from "@/components/providers/SocketProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratifii",
  description: "Outsourcing Interview Platform",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-black via-black to-violet-950`}
      >
        <SocketProvider>{children}</SocketProvider>

        <Toaster
          position="bottom-right"
          duration={1500}
          toastOptions={{
            className: "custom-toast",
          }}
        />
      </body>
    </html>
  );
}
