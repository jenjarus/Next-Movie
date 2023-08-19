import React from "react";
import { Metadata } from "next";
import { RootLayoutRender } from "./RootLayoutRender";
import { Inter } from "next/font/google";
import "../styles/global.scss";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ПоискКино",
  description: "Сайт для поиска кино",
};

type TypeRootLayout = { children: React.ReactNode };

const RootLayout = ({ children }: TypeRootLayout) => {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <RootLayoutRender childrenPage={children} />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
