"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapLoadingWidget } from "@/components/loadingWidget";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
          {
            <Markers
              points={[
                {
                  key: "2",
                  type: "🌄",
                  url: "/Attractions/lake.png",
                  description: "獅子亭",
                  lat: 22.416039,
                  lng: 114.209333,
                },
                {
                  key: "3",
                  type: "⛲",
                  url: "/Attractions/lake.png",
                  description: "未圓湖",
                  lat: 22.4163,
                  lng: 114.210031,
                },
                {
                  key: "4",
                  type: "⛰️",
                  url: "/Attractions/bridge.png",
                  description: "小橋流水 - 校友徑",
                  lat: 22.416332,
                  lng: 114.207028,
                },
                {
                  key: "5",
                  type: "🛰️",
                  url: "",
                  description: "賽馬會氣候變化博物館",
                  lat: 22.416242,
                  lng: 114.211024,
                },
                {
                  key: "6",
                  type: "🗼",
                  url: "",
                  description: "新亞水塔",
                  lat: 22.420742,
                  lng: 114.208552,
                },
                {
                  key: "7",
                  type: "⛲",
                  url: "/Attractions/pavilion.png",
                  description: "天人合一",
                  lat: 22.421639,
                  lng: 114.210049,
                },
                {
                  key: "8",
                  type: "🌇",
                  url: "/Attractions/lws.png",
                  description: "和聲書院",
                  lat: 22.422531,
                  lng: 114.204243,
                },
              ]}
            />
          }
        </Map>
      </APIProvider>
    </div>
  );
}

type Point = {
  key: string;
  type: string;
  url: string;
  description: string;
  lat: number;
  lng: number;
};
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
          onClick={() => {
            showSwal({
              title: point.description,
              text: ``,
              imageUrl: point.url || "",
            });
          }}
        >
          <h1 style={{ fontSize: "1.5em", color: "#000000" }}>{point.type}</h1>
        </AdvancedMarker>
      ))}
    </>
  );
};

const showSwal = ({ title, text, imageUrl }: { title: string; text: string; imageUrl: string }) => {
  withReactContent(Swal).fire({
    title: title,
    text: text,
    confirmButtonColor: "#000",
    imageUrl: imageUrl,
    imageAlt: "Bus Stop Image",
  });
};
