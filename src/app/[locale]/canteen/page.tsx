"use client";
import React, { useState, useRef, useEffect } from "react";
import CurrentLocationMarker from "@/components/Home/CurrentLocationMarker";
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
import { useTranslations } from "next-intl";

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
          {
            <Markers
              points={[
                { key: "28", lat: 22.414783, lng: 114.207341 },
                { key: "29", lat: 22.41512, lng: 114.207057 },
                { key: "30", lat: 22.416618, lng: 114.209774 },
                { key: "31", lat: 22.416241, lng: 114.210836 },
                { key: "32", lat: 22.416271, lng: 114.211136 },
                { key: "33", lat: 22.415569, lng: 114.207621 },
                { key: "34", lat: 22.415753, lng: 114.207535 },
                { key: "35", lat: 22.41714, lng: 114.208804 },
                { key: "36", lat: 22.417373, lng: 114.208611 },
                { key: "37", lat: 22.418099, lng: 114.210204 },
                { key: "38", lat: 22.418555, lng: 114.210172 },
                { key: "39", lat: 22.417757, lng: 114.208267 },
                { key: "40", lat: 22.418383, lng: 114.205329 },
                { key: "41", lat: 22.418214, lng: 114.205399 },
                { key: "42", lat: 22.418209, lng: 114.204905 },
                { key: "43", lat: 22.418721, lng: 114.204932 },
                { key: "44", lat: 22.419732, lng: 114.204002 },
                { key: "45", lat: 22.421039, lng: 114.205815 },
                { key: "46", lat: 22.421048, lng: 114.209213 },
                { key: "47", lat: 22.419619, lng: 114.208753 },
                { key: "48", lat: 22.422547, lng: 114.204153 },
                { key: "49", lat: 22.422389, lng: 114.204282 },
                { key: "50", lat: 22.42204, lng: 114.202564 },
                { key: "51", lat: 22.422422, lng: 114.201357 },
                { key: "52", lat: 22.421395, lng: 114.204223 },
                { key: "53", lat: 22.425253, lng: 114.206322 },
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
  const t = useTranslations("Canteen");
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
          onClick={() => {
            Swal.fire({
              title: t("title"),
              html: `<a href="https://www.google.com/maps/search/?api=1&query=${point.lat}%2C${
                point.lng
              }" target="_blank">${t("open")}</a>`,
              showCloseButton: true,
              showCancelButton: false,
              focusConfirm: false,
            });
          }}
        >
          <h1 style={{ fontSize: "2em", color: "#000000" }}>{"🍱"}</h1>
        </AdvancedMarker>
      ))}
    </>
  );
};
