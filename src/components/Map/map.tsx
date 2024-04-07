"use client";
import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

function Map() {
  const containerStyle = {
    height: "100%",
    width: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    googleMapsApiKey: "123" as string,
  });

  const [map, setMap] = React.useState(null);

  const defaultProps = {
    center: { lat: 22.4196, lng: 114.2068 },
    zoom: 16,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultProps.center}
      zoom={defaultProps.zoom}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
