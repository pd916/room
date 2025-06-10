import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"
import "./globals.css";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import QueryProvider from "@/components/providers/QueryProvider";
import ModelProvider from "@/components/providers/model-provider";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Livevibe",
  description: "Livevibe is a live quizzes class session",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConfettiProvider/>
        <SocketProvider>
          <ModelProvider/>
          <QueryProvider>
        {children}
          </QueryProvider>
        </SocketProvider>
        <Toaster />
      </body>
    </html>
  );
}
