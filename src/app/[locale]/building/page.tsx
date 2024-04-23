"use client";
import React, { useState, useRef, useEffect } from "react";
import { MapLoadingWidget } from "@/components/loadingWidget";
import { MdAddLocationAlt } from "react-icons/md";
import { useGeoLocation } from "@custom-react-hooks/all";
import Swal from "sweetalert2";
import { CurrentLocationPointer } from "@/components/MapUtils/CurrentLocationPointer";
import { Button } from "@nextui-org/react";

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
import { containerStyle, center, zoom } from "@/components/MapUtils/MapConfigs";

type commentType = {
  _id: string;
  content?: string;
  lat: number;
  lng: number;
};

const colorList = [
  "#FF0000", // Red
  "#FF0033",
  "#FF0066",
  "#FF0099",
  "#FF00CC",
  "#FF00FF", // Magenta
  "#CC00FF",
  "#9900FF",
  "#6600FF",
  "#3300FF",
  "#0000FF", // Blue
  "#3300CC",
  "#660099",
  "#990066",
  "#CC0033",
  "#FF0000", // Red
];

// const comments: commentType[] = [
//   { content: "新宿最強", lat: 22.4171, lng: 114.2111 },
//   { content: "何宿最強", lat: 22.4174, lng: 114.2111 },
//   { content: "應林最強", lat: 22.4166, lng: 114.2107 },
//   { content: "煲底相見", lat: 22.4194, lng: 114.2079 },
//   { content: "天台好凍", lat: 22.4198, lng: 114.2092 },
//   { content: "Reg科聖地", lat: 22.4197, lng: 114.2063 },
//   { content: "和盡天地風雲之聲", lat: 22.4224, lng: 114.2043 },
//   { content: "畢唔到業", lat: 22.4196, lng: 114.2052 },
//   { content: "賤橋", lat: 22.4184, lng: 114.2073 },
//   {  content: "天人合一", lat: 22.4215, lng: 114.2099 },
// ];

export default function BuildingComponent() {
  // query comments
  const [comments, setComments] = useState<commentType[]>([]);

  useEffect(() => {
    getComment().then((data) => {
      setComments(data.data);
    });
  }, []);

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
          defaultZoom={zoom}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID?.toString() || ""}
          clickableIcons={false}
        >
          {<Markers data={comments} />}
          <FloatingActionBtn />
          <CurrentLocationPointer />
        </Map>
      </APIProvider>
    </div>
  );
}

const FloatingActionBtn = () => {
  const { loading, coordinates } = useGeoLocation();
  const t = useTranslations("NewPoint");

  return (
    !loading &&
    coordinates && (
      <Button
        color="secondary"
        size="lg"
        style={{
          position: "fixed",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={() => {
          Swal.fire({
            title: t("commentPoint"),
            input: "text",
            inputPlaceholder: t("commentLimits"),
            showCancelButton: true,
            cancelButtonText: t("cancel"),
            confirmButtonText: t("create"),
            showLoaderOnConfirm: true,
            preConfirm: (comment) => {
              if (!comment) {
                Swal.showValidationMessage(t("noEmpty"));
              }
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              postComment({
                content: result.value.substring(0, 10),
                lat: parseFloat(coordinates?.latitude.toFixed(4)),
                lng: parseFloat(coordinates?.longitude.toFixed(4)),
              });
              Swal.fire(t("created"), "", "success");
            }
          });
        }}
      >
        <MdAddLocationAlt />
        {t("addYourComment")}
      </Button>
    )
  );
};

type Props = { data: commentType[] };

const Markers = ({ data }: Props) => {
  // const colorList = ["#FF5733", "#C70039", "#900C3F", "#581845", "#1C2833", "#17202A"];
  const map = useMap();
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const clusterer = useRef<MarkerClusterer | null>(null);
  // Initialize MarkerClusterer
  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({
        map,
        algorithm: new SuperClusterAlgorithm({
          maxZoom: 18,
          radius: 100,
        }),
      });
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

  const [colors, setColors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const newColors = data.reduce(
      (acc, point) => {
        if (!acc[point._id]) {
          acc[point._id] = "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
        return acc;
      },
      { ...colors }
    );
    setColors(newColors);
  }, [data]);

  return (
    <>
      {data.map((point, index) => {
        const color = colorList[index % colorList.length]; // Use modulus to cycle through color list
        console.log(point);
        return (
          <AdvancedMarker
            position={new google.maps.LatLng(point.lat, point.lng)}
            key={point._id}
            ref={(marker) => setMarkerRef(marker, point._id)}
          >
            <h1
              style={{
                fontSize: "2em",
                color: "#ffffff", // Base color is white
                WebkitTextStroke: "1.5px " + color, // Stroke color is from color list
                padding: "5px",
              }}
            >
              {point.content ? point.content : "🌳"}
            </h1>
          </AdvancedMarker>
        );
      })}
    </>
  );
};

async function getComment() {
  try {
    const response = await fetch("api/comment");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function postComment({ content, lat, lng }: { content: string; lat: number; lng: number }) {
  try {
    const response = await fetch("api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        lat,
        lng,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
