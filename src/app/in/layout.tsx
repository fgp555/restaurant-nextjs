import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/global.scss";
import "./Layout.scss";
import { Header } from "@/components/Header/Header";
import { BottomTabs } from "@/components/BottomTabs/BottomTabs";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurante Sabor & Arte",
  description: "Disfruta de una experiencia culinaria inolvidable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="layout">
          <Header />
          <main>{children}</main>
          <BottomTabs />
        </div>
      </body>
    </html>
  );
}
