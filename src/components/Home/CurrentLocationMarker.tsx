"use client";
import React, { useEffect, useContext, useState } from "react";
import { useGeoLocation } from "@custom-react-hooks/all";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useMap } from "@vis.gl/react-google-maps";

export default function CurrentLocationMarker() {
  const map = useMap();
  const { loading, coordinates, error, isWatching } = useGeoLocation({}, true);

  const [isFirstTime, setisFirstTime] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (coordinates) {
        // console.log("coordinates", coordinates);
      }
    }, 60000); // Runs every 1 minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [coordinates]);

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log("running", isFirstTime);
      if (coordinates !== null && map && isFirstTime) {
        // console.log("Current Location is rendered on the map.");
        // map.setCenter({ lat: coordinates.latitude, lng: coordinates.longitude });
        setisFirstTime(false);
      }
    }, 60000); // Runs every 1 minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [coordinates, map, isFirstTime]);

  // console.table({ loading, coordinates, error, isWatching, map, isFirstTime });

  return (
    !loading &&
    !error &&
    map &&
    coordinates && (
      <AdvancedMarker position={{ lat: coordinates.latitude, lng: coordinates.longitude }}>
        {/* <AdvancedMarker position={{ lat: 22, lng: 114 }}> */}
        <div
          style={{
            width: 16,
            height: 16,
            position: "absolute",
            top: 0,
            left: 0,
            background: "blue",
            border: "2px solid white",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0px 0px 10px red",
          }}
        ></div>
      </AdvancedMarker>
    )
  );
}
