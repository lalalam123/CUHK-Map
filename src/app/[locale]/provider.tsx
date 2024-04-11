"use client";

import React, { createContext, useState, useMemo } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { DepartureContext } from "@/components/context/context";
import { DestinationContext } from "@/components/context/context";
import { ZoomContext } from "@/components/context/context";
import { CenterContext } from "@/components/context/context";

export const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [departure, setDeparture] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [zoom, setZoom] = React.useState(18);
  const [center, setCenter] = React.useState({
    lat: 22.416389,
    lng: 114.211111,
  });

  const departureContextValue = useMemo(
    () => ({ departure, setDeparture }),
    [departure, setDeparture]
  );

  const destinationContextValue = useMemo(
    () => ({ destination, setDestination }),
    [destination, setDestination]
  );

  const zoomContextValue = useMemo(() => ({ zoom, setZoom }), [zoom, setZoom]);
  const centerContextValue = useMemo(() => ({ center, setCenter }), [center, setCenter]);
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        <DepartureContext.Provider value={departureContextValue}>
          <DestinationContext.Provider value={destinationContextValue}>
            <CenterContext.Provider value={centerContextValue}>
              <ZoomContext.Provider value={zoomContextValue}>{children}</ZoomContext.Provider>
            </CenterContext.Provider>
          </DestinationContext.Provider>
        </DepartureContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
