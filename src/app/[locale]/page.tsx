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
  return <SearchSection />;
};

export default HomePage;
