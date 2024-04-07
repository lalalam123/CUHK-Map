"use client";

import React, { useMemo } from "react";
// import Map from "../components/map";
// import Location from "../components/geolocation";

import Header from "../../components/Header/header";
import FeatureList from "@/components/Header/featureList";
import List from "../../components/List/list";
import Map from "../../components/Map/map";
import Places from "../../components/PlacesDetails/placesDetails";

import { CssBaseline, Grid } from "@mui/material";
import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";

import { LoadScript } from "@react-google-maps/api";
import { GoogleMap } from "@react-google-maps/api";

import { useTranslations } from "next-intl";

const HomePage: React.FC = () => {
  const t = useTranslations("Home");

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

  const lib: any[] = ["places"];

  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <DepartureContext.Provider value={departureContextValue}>
          <DestinationContext.Provider value={destinationContextValue}>
            <div className="dark w-full ">
              <Header />
              <FeatureList />
              <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <SearchSection />
                </div>
                <div className="col-span-2">
                  <GoogleMapSection />
                </div>
              </div>
            </div>
          </DestinationContext.Provider>
        </DepartureContext.Provider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default HomePage;
