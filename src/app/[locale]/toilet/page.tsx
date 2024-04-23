"use client";
import React, { useState, useRef, useEffect } from "react";
import CurrentLocationMarker from "@/components/Home/CurrentLocationMarker";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer, SuperClusterAlgorithm, GridAlgorithm } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

const containerStyle = {
  width: "100%",
  height: "100vh",
  borderColor: "black",
};

const center = {
  lat: 22.416389,
  lng: 114.211111,
};

type commentType = {
  id: number;
  content: string;
  coordinate: { lat: number; lng: number };
};

const comments: commentType[] = [
  {
    id: 1,
    content: "Good",
    coordinate: { lat: 22.417136, lng: 114.210907 },
  },
  {
    id: 2,
    content: "Bad",
    coordinate: { lat: 22.417135, lng: 114.210908 },
  },
];

export default function page() {
  return (
    <div>
      <APIProvider
        version="quarterly"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        language="en"
      >
        <Map
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={16}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID?.toString() || ""}
          clickableIcons={false}
        >
          <CurrentLocationMarker />
          <Markers
            points={[
              { key: "1", lat: 22.416289, lng: 114.211033 },
              { key: "2", lat: 22.416641, lng: 114.209869 },
              { key: "3", lat: 22.416601, lng: 114.208812 },
              { key: "4", lat: 22.417216, lng: 114.208834 },
              { key: "5", lat: 22.413577, lng: 114.208638 },
              { key: "6", lat: 22.414901, lng: 114.20874 },
              { key: "7", lat: 22.415593, lng: 114.20714 },
              { key: "8", lat: 22.415251, lng: 114.20729 },
              { key: "9", lat: 22.415038, lng: 114.207478 },
              { key: "10", lat: 22.414805, lng: 114.207698 },
              { key: "11", lat: 22.41676, lng: 114.211729 },
              { key: "12", lat: 22.416452, lng: 114.211424 },
              { key: "13", lat: 22.41617, lng: 114.211558 },
              { key: "14", lat: 22.418486, lng: 114.210732 },
              { key: "15", lat: 22.417687, lng: 114.209389 },
              { key: "16", lat: 22.418094, lng: 114.207929 },
              { key: "17", lat: 22.418059, lng: 114.207317 },
              { key: "18", lat: 22.419443, lng: 114.207954 },
              { key: "19", lat: 22.419537, lng: 114.207957 },
              { key: "20", lat: 22.419886, lng: 114.209234 },
              { key: "21", lat: 22.418539, lng: 114.205051 },
              { key: "22", lat: 22.418242, lng: 114.205442 },
              { key: "23", lat: 22.419996, lng: 114.206561 },
              { key: "24", lat: 22.420536, lng: 114.204501 },
              { key: "25", lat: 22.421637, lng: 114.208243 },
              { key: "26", lat: 22.421498, lng: 114.208436 },
              { key: "27", lat: 22.420288, lng: 114.209165 },
            ]}
          />
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = { key: string; lat: number; lng: number };
type Props = { points: Point[] };

const Markers = ({ points }: Props) => {
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map, algorithm: new SuperClusterAlgorithm({}) });
    }
  }, [map]);

  // Update markers
  useEffect(() => {
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  const setMarkerRef = (marker: Marker | null, key: string) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  return (
    <>
      {points.map((point) => (
        <AdvancedMarker
          position={point}
          key={point.key}
          ref={(marker) => setMarkerRef(marker, point.key)}
        >
          <h1 style={{ fontSize: "2em", color: "#000000" }}>{"🚾"}</h1>
        </AdvancedMarker>
      ))}
    </>
  );
};
