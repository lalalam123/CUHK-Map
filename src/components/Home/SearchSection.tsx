"use client";
import React, { useContext, useEffect } from "react";
import InputItem from "./InputItem";
import { DepartureContext } from "@/components/context/context";
import { DestinationContext } from "@/components/context/context";
import { useTranslations } from "next-intl";
import useGeoLocation from "@custom-react-hooks/use-geo-location";

function SearchSection() {
  const t = useTranslations("SearchSection");
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { loading, coordinates, error, isWatching } = useGeoLocation();

  useEffect(() => {
    console.log("departure", departure);
  }, [departure]);

  return (
    <div className="p-5 md:pd-5 border-[2px] rounded-xl">
      <p className="text-[20px] font-bold">{t("getPath")}</p>
      <InputItem type="departure" />
      <InputItem type="destination" />
      <button
        disabled={loading && coordinates !== null}
        onClick={() => {
          if (coordinates === null) {
            alert("Please enable location services");
            return;
          } else if (coordinates !== null) {
            setDeparture({
              name: "Current Location",
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            });
          }
        }}
        className="p-3 bg-gray-600 w-full rounded-lg mt-5 mb-2 text-white"
      >
        {"current location as departure point"}
      </button>
      <button onClick={() => {}} className="p-3 bg-gray-600 w-full rounded-lg mt-5 mb-2 text-white">
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
