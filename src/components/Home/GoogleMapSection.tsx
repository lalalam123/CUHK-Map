"use client";
import React, { useContext, useEffect, useState } from "react";
import { APIProvider, Map, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useApiIsLoaded, useApiLoadingStatus } from "@vis.gl/react-google-maps";

import { DepartureContext } from "@/components/context/DepartureContext";
import { DestinationContext } from "@/components/context/DestinationContext";

import { MapLoadingWidget } from "../loadingWidget";

const containerStyle = {
  width: "100%",
  height: "100vh",
  borderColor: "black",
};

const center = {
  lat: 22.416389,
  lng: 114.211111,
};

function GoogleMapSection() {
  // useApiIsLoaded & useApiLoadingStatus are imported from @vis.gl/react-google-maps
  // But they are not working as expected
  const [isLoading, setIsLoading] = useState(true);
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
      language="en"
      onLoad={() => {
        setIsLoading(false);
      }}
    >
      {!isLoading ? (
        <Map
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={14}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID?.toString() || ""}
          clickableIcons={false}
        >
          <Directions />
        </Map>
      ) : (
        <MapLoadingWidget />
      )}
    </APIProvider>
  );
}

export default GoogleMapSection;

function Directions() {
  const { departure, setDeparture } = useContext(DepartureContext);
  const { destination, setDestination } = useContext(DestinationContext);

  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;
    if (!departure || !destination) return;
    console.log("dep", departure, "des", destination);

    directionsService
      .route({
        origin: departure.name,
        destination: destination.name,
        travelMode: google.maps.TravelMode.WALKING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    // return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, departure, destination]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
