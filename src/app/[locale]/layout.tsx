import type { Metadata } from "next";
import React, { useMemo } from "react";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import Header from "../../components/Header/header";
import FeatureList from "@/components/Header/featureList";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "./provider";
import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CUHK Map",
  description: "CUHK Location Based System",
  keywords: ["CUHK", "Map", "Location Based System"],
  creator: "Chan Sik Lam",
  authors: [{ name: "Chan Sik Lam" }],
  publisher: "Chan Sik Lam",
};

interface RootLayoutProps {
  children: React.ReactNode;
  locale: never;
}

export default function RootLayout({ children, locale }: RootLayoutProps) {
  // Receive messages provided in `i18n.ts`
  const messages = useMessages();

  return (
    <html lang={locale} className="overscroll-none">
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ThemeProvider>
          <body className={inter.className}>
            <div className="w-full bg-white dark:bg-black text-slate-900 dark:text-white font-medium">
              <Header />
              <FeatureList />
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3">
                <div>{children}</div>
                <div className="col-span-2">
                  {/* <GoogleMapSection /> */}
                  <h1>Map</h1>
                </div>
              </div>
            </div>
          </body>
        </ThemeProvider>
      </NextIntlClientProvider>
    </html>
  );
}
