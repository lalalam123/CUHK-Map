"use client";

import React, { useMemo } from "react";
import { useTranslations } from "next-intl";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import Header from "../../components/Header/header";
import FeatureList from "@/components/Header/featureList";
import SearchSection from "@/components/Home/SearchSection";
import GoogleMapSection from "@/components/Home/GoogleMapSection";

import { useApiLoadingStatus, useMap } from "@vis.gl/react-google-maps";

const HomePage: React.FC = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-3">
      <div>
        <SearchSection />
      </div>
      <div className="col-span-2 sm:mx-3 sm:my-0 my-3">
        <GoogleMapSection />
      </div>
    </div>
  );
};

export default HomePage;
