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
      let watchId: number | null = null;

      const updateLocation = () => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
        }

        watchId = navigator.geolocation.watchPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              altitude: position.coords.altitude,
            });
          },
          (error) => console.log(error),
          {
            maximumAge: 0,
            timeout: 30000,
          }
        );
      };

      // Call updateLocation immediately and then every 30 seconds
      updateLocation();
      const intervalId = setInterval(updateLocation, 30000);

      // To prevent memory leaks and unnecessary work
      // Cleanup function to stop watching user's position and interval when component unmounts

      return () => {
        if (watchId !== null) {
          navigator.geolocation.clearWatch(watchId);
        }
        clearInterval(intervalId);
      };
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
