"use client";
import React, { useContext, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";

import { GridLoader } from "react-spinners";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 22.416389,
  lng: 114.211111,
};

function GoogleMapSection() {
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (departure && destination) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: departure.lat, lng: departure.lng });
      bounds.extend({ lat: destination.lat, lng: destination.lng });
      map?.fitBounds(bounds);
      if (map !== null) {
        const zoom = map.getZoom();
        if (typeof zoom === "number" && zoom !== undefined) {
          map.setZoom(zoom - 1); // leave some space padding in the margin
        }
      }
    } else if (departure) {
      map?.panTo({ lat: departure.lat, lng: departure.lng });
      map?.setZoom(14); // Adjust zoom level as needed
    } else if (destination) {
      map?.panTo({ lat: destination.lat, lng: destination.lng });
      map?.setZoom(14); // Adjust zoom level as needed
    }
  }, [map, departure, destination]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map | null) {
    const bounds = new window.google.maps.LatLngBounds(center);
    // if (map) {
    //   map.fitBounds(bounds);
    // }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: google.maps.Map | null) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID?.toString() || "",
        }}
      >
        {departure && (
          <Marker icon={"./blue-pin.png"} position={{ lat: departure.lat, lng: departure.lng }} />
        )}
        {destination && (
          <Marker
            icon={"./red-pin.png"}
            position={{ lat: destination.lat, lng: destination.lng }}
          />
        )}
      </GoogleMap>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <GridLoader color={"#ffffff"} loading={true} size={15} />
    </div>
  );
}

export default GoogleMapSection;
