"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapLoadingWidget } from "@/components/loadingWidget";
import Swal from "sweetalert2";

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
          {/* {comments.map((comment) => (
            <AdvancedMarker
              key={comment.id}
              position={comment.coordinate}
              onClick={() => {
                Swal.fire({
                  text: comment.content,
                });
              }}
            >
              <h1 style={{ fontSize: "2em", color: "#000000" }}>{comment.content}</h1>
            </AdvancedMarker>
          ))} */}
          {
            <Markers
              points={[
                { key: "1", lat: 22.4171, lng: 114.2111 },
                { key: "2", lat: 22.4172, lng: 114.2112 },
                { key: "3", lat: 22.4171, lng: 114.2112 },
                { key: "4", lat: 22.4172, lng: 114.2111 },
              ]}
            />
          }
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
          {/* <span className="tree">🌳</span> */}
          <h1 style={{ fontSize: "1.5em", color: "#000000" }}>{"🌳"}</h1>
        </AdvancedMarker>
      ))}
    </>
  );
};
