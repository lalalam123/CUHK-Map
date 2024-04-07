import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "../globals.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { NextIntlClientProvider, useMessages } from "next-intl";

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
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={inter.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
