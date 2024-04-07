"use client";
import React from "react";
import { useEffect, useRef, useMemo, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import path from "path";

import { Paper, Typography, useMediaQuery } from "@mui/material";
import { LocationCityOutlined } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

function Map() {
  const isMobile = useMediaQuery("(max-width: 600px)");

  // // A reference to the div elemtnet that will contain the map
  // const mapRef = useRef<HTMLDivElement>(null);
  // // A reference to the map instance
  // const mapInstanceRef = useRef<google.maps.Map | null>(null);
  // // A reference to the path instance
  // const pathInstanceRef = useRef<google.maps.Polyline | null>(null);
  // const [showPath, setShowPath] = useState(true);

  // const pathCoordinates = [
  //   { lat: 22.4138611, lng: 114.2100278 },
  //   { lat: 22.41601, lng: 114.210808 },
  //   { lat: 22.416978, lng: 114.211813 },
  //   { lat: 22.417641, lng: 114.21034 },
  //   { lat: 22.418212, lng: 114.208485 },
  //   { lat: 22.418172, lng: 114.207328 },
  //   { lat: 22.418663, lng: 114.207324 },
  //   { lat: 22.419226, lng: 114.207295 },
  //   { lat: 22.419542, lng: 114.206953 },
  // ];

  // useEffect(() => {
  //   // console.log("Running useEffect 1");
  //   const initMap = async () => {
  //     const loader = new Loader({
  //       apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  //       version: "weekly",
  //     });

  //     const { Map } = await loader.importLibrary("maps");

  //     const position = { lat: 22.4196, lng: 114.2068 };

  //     const mapOptions: google.maps.MapOptions = {
  //       center: position,
  //       zoom: 15,
  //       mapId: "YOUR_MAP",
  //     };

  //     const map = new Map(mapRef.current as HTMLDivElement, mapOptions);
  //     mapInstanceRef.current = map;

  //     const marker = new google.maps.Marker({
  //       position: position,
  //       map: map,
  //     });

  //     // Create the polyline
  //     const path = new google.maps.Polyline({
  //       path: pathCoordinates,
  //       geodesic: true,
  //       strokeColor: "#FF0000",
  //       strokeOpacity: 1.0,
  //       strokeWeight: 10,
  //     });
  //     pathInstanceRef.current = path;

  //     path.setMap(map);
  //   };

  //   initMap();
  // }, []);

  // // Toggle the path when the showPath state changes
  // useEffect(() => {
  //   console.log("Running useEffect 2");
  //   console.log(mapInstanceRef.current, pathInstanceRef.current, showPath);
  //   if (mapInstanceRef.current !== null && pathInstanceRef.current !== null) {
  //     if (showPath) {
  //       pathInstanceRef.current.setMap(mapInstanceRef.current);
  //     } else {
  //       pathInstanceRef.current.setMap(null);
  //     }
  //   } else {
  //     console.log("no map instance");
  //   }
  // }, [showPath]);

  return (
    <div>
      Map
      {/* <h2>Here: {showPath.toString()}</h2>
      <button onClick={() => setShowPath(!showPath)}>{showPath ? "Hide Path" : "Show Path"}</button>
      <div style={{ height: "80vh" }} ref={mapRef}></div> */}
    </div>
  );
}

export default React.memo(Map);
