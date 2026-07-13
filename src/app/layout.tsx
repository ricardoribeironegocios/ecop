import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DBProvider } from "@/context/DBContext";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WhatsAppFloat from "@/components/shared/WhatsAppFloat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false, // Mono font is not critical for above-the-fold
});

export const metadata: Metadata = {
  title: "Ministério Ricardo Ribeiro & ECOP",
  description: "Ativação Profética e Escola de Capacitação Profética (ECOP) - Destino e Alinhamento de Chamado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        {/* Preload LCP hero portrait – improves Largest Contentful Paint */}
        <link
          rel="preload"
          as="image"
          href="/hero-portrait-v7.webp"
          fetchPriority="high"
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <DBProvider>
          <Header />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <WhatsAppFloat />
        </DBProvider>
      </body>
    </html>
  );
}
