"use client";
import React, { useEffect, useState } from "react";

interface Coordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
}

const Location: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
        });
      });
    }
  }, []);

  return (
    <div>
      {coordinates ? (
        <>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>
          <p>Altitude: {coordinates.altitude !== null ? coordinates.altitude : "Not available"}</p>
        </>
      ) : (
        <p>Getting location...</p>
      )}
    </div>
  );
};

export default Location;
