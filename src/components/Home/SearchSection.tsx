"use client";
import React, { useContext } from "react";
import InputItem from "./InputItem";
import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";
import { useTranslations } from "next-intl";

function SearchSection() {
  const t = useTranslations("SearchSection");
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);

  return (
    <div className="p-5 md:pd-5 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">{t("getPath")}</p>
      <InputItem type="departure" />
      <InputItem type="destination" />
      <button className="p-3 bg-gray-600 w-full rounded-lg mt-5 mb-2 text-white">
        {t("search")}
      </button>
      <h1>{t("departure")}</h1>
      {departure && <p>{departure.name}</p>}
      <h1>{t("destination")}</h1>
      {destination && <p>{destination.name}</p>}
    </div>
  );
}

export default SearchSection;
