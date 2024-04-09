"use client";
import React from "react";
import TextTransition, { presets } from "react-text-transition";
import { useTranslations } from "next-intl";
import { GridLoader } from "react-spinners";

export const MapLoadingWidget = () => {
  const t = useTranslations("WaitingMessage");
  const [index, setIndex] = React.useState(0);
  const TEXTS = [t("loading"), t("holdOn"), t("almostThere"), t("yourMapIsReady"), t("welcome")];
  // const TEXTS = ["loading", "holdOn", "almostThere", "yourMapIsReady", "welcome"];

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000 // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-5 justify-center items-center h-64 sm:h-screen">
      {/* <GridLoader loading={true} size={15} color="#AAAAAA" /> */}
      <h1 color="#AAAAAA">
        <TextTransition className="text-gray-400" springConfig={presets.wobbly}>
          {TEXTS[index % TEXTS.length]}
        </TextTransition>
      </h1>
    </div>
  );
};
