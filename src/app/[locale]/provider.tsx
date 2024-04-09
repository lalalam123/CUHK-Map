"use client";

import React, { createContext, useState, useMemo } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [departure, setDeparture] = React.useState(null);
  const [destination, setDestination] = React.useState(null);

  const departureContextValue = useMemo(
    () => ({ departure, setDeparture }),
    [departure, setDeparture]
  );

  const destinationContextValue = useMemo(
    () => ({ destination, setDestination }),
    [destination, setDestination]
  );

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <DepartureContext.Provider value={departureContextValue}>
          <DestinationContext.Provider value={destinationContextValue}>
            {children}
          </DestinationContext.Provider>
        </DepartureContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
