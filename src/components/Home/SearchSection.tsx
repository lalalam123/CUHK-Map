"use client";
import React, { useContext, useEffect, useState } from "react";
import InputItem from "./InputItem";
import { DepartureContext } from "@/components/context/context";
import { DestinationContext } from "@/components/context/context";
import { useTranslations } from "next-intl";
import useGeoLocation from "@custom-react-hooks/use-geo-location";
import { Button, Badge } from "@nextui-org/react";

import { FaWheelchairMove } from "react-icons/fa6";
import { FaBusAlt } from "react-icons/fa";
import { FaPersonWalking } from "react-icons/fa6";
import { FaPersonWalkingWithCane } from "react-icons/fa6";
import { MdAssistWalker } from "react-icons/md";
import { TbBikeOff } from "react-icons/tb";

function SearchSection() {
  const t = useTranslations("SearchSection");
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const { loading, coordinates, error, isWatching } = useGeoLocation();
  return (
    <div className="p-5 md:pd-5 border-[2px] rounded-xl gap-5">
      <p className="text-[20px] font-bold">{t("getPath")}</p>
      <InputItem type="departure" />
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
        {t("useCurrentLocation")}
      </button>
      <InputItem type="destination" />
      <div className="flex flex-wrap gap-4 items-center justify-between mt-4 bg-colore-white">
        <Button isIconOnly size="lg" color="success">
          <FaPersonWalking />
        </Button>
        <Button isIconOnly size="lg" color="success">
          <MdAssistWalker />
        </Button>
        <Button isIconOnly size="lg" color="default">
          <TbBikeOff />
        </Button>
        <Button isIconOnly size="lg">
          <FaBusAlt />
        </Button>
        <Button isIconOnly size="lg">
          <FaWheelchairMove />
        </Button>
        <button onClick={() => {}} className="p-3 bg-gray-600 w-full rounded-lg mt-2 text-white">
          {t("search")}
        </button>
      </div>

      {/* <h1>{t("departure")}</h1>
      {departure && <p>{departure.name}</p>}
      <h1>{t("destination")}</h1>
      {destination && <p>{destination.name}</p>} */}
    </div>
  );
}

export default SearchSection;
