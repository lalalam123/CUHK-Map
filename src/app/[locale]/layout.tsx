import type { Metadata } from "next";
import React, { useMemo } from "react";
import { Inter, Montserrat } from "next/font/google";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  Marker,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import Header from "../../components/Header/header";
import FeatureList from "@/components/Header/featureList";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "./provider";
import { DepartureContext } from "@/components/context/context";
import { DestinationContext } from "@/components/context/context";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import dynamic from "next/dynamic";
import { MapLoadingWidget } from "@/components/loadingWidget";

import Footer from "@/components/Header/footer";

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
          <HydrationOverlay>
            <body className={inter.className}>
              <div className="w-full bg-white dark:bg-black text-slate-900 dark:text-white font-medium flex flex-col min-h-screen">
                <Header />
                <FeatureList />
                <div className="flex-grow">{children}</div>
                <Footer />
                <SpeedInsights />
              </div>
            </body>
          </HydrationOverlay>
        </ThemeProvider>
      </NextIntlClientProvider>
    </html>
  );
}
