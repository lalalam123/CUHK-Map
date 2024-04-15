"use client";

import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import { Button } from "@nextui-org/react";

import {
  BusStops,
  BusStopsPath,
  BusRoutes,
  BusStopType,
  BusStopsPathType,
  BusRouteType,
} from "./data";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const containerStyle = {
  width: "100%",
  height: "100vh",
  borderColor: "black",
};

const center = {
  lat: 22.416389,
  lng: 114.211111,
};

const BusComponent: React.FC = () => {
  const [routeIndex, setRouteIndex] = useState<string>("1A");
  const [pointToDisplay, setPointToDisplay] = useState<any>([]);
  const [pathToDisplay, setPathToDisplay] = useState<any>([]);

  useEffect(() => {
    const stopsSequence = BusRoutes.filter((route) => route.name === routeIndex)[0]?.stops || [];
    console.log("Stop Sequence", stopsSequence);

    let path: any[] = [];
    for (let i = 0; i < stopsSequence.length - 1; i++) {
      const currentStop = stopsSequence[i];
      const nextStop = stopsSequence[i + 1];
      const pathSegment =
        BusStopsPath.filter(
          (path) => path.departure === currentStop && path.destination === nextStop
        )[0]?.path || [];
      path = path.concat(pathSegment);
    }

    const stops =
      stopsSequence.map((stop) => BusStops.find((busStop) => busStop.stop_id === stop)) || [];

    setPointToDisplay(stops);
    setPathToDisplay(path);
  }, [routeIndex]);

  return (
    <div>
      <BusRouteSwitcherButtonGroups BusRoutes={BusRoutes} setRouteIndex={setRouteIndex} />
      <p>{routeIndex}</p>
      <p>
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours ||
          "No information available"}
      </p>
      <p>
        School Bus {routeIndex} operates from{" "}
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours || "00:00"} to{" "}
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours || "23:59"}
        {BusRoutes.find((route) => route.name === routeIndex)?.isWeekdayOnly && " (Weekdays Only)"}
      </p>
      <APIProvider
        version="quarterly"
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        language="en"
      >
        <Map
          style={containerStyle}
          defaultCenter={center}
          defaultZoom={15}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID?.toString() || ""}
          clickableIcons={false}
        >
          <BusStopsComponents stops={pointToDisplay} />
          <BusRoutesComponent path={pathToDisplay} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default BusComponent;

function BusRouteSwitcherButtonGroups({
  BusRoutes,
  setRouteIndex,
}: {
  BusRoutes: BusRouteType[];
  setRouteIndex: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "left",
      }}
    >
      {BusRoutes.map((route, index) => (
        <Button
          key={index}
          onClick={() => {
            setRouteIndex(route.name);
          }}
          size="sm"
          style={{
            margin: "10px",
            background: route.bgColor,
            fontWeight: "bold",
          }}
        >
          {`Bus ${route.name}`}
        </Button>
      ))}
    </div>
  );
}

function BusStopsComponents({ stops }: { stops: BusStopType[] }) {
  const showSwal = ({
    title,
    text,
    imageUrl,
  }: {
    title: string;
    text: string;
    imageUrl: string;
  }) => {
    withReactContent(Swal).fire({
      title: title,
      text: text,
      confirmButtonColor: "#000",
      imageUrl: imageUrl,
      imageAlt: "Bus Stop Image",
    });
  };

  return stops.map((stops: BusStopType, index: number) => (
    <AdvancedMarker
      key={index}
      position={stops.location}
      onClick={() => {
        showSwal({ title: stops.name, text: `Next Bus:`, imageUrl: stops?.imageUrl || "" });
      }}
    >
      <Pin background={"#9AC8CD"} glyphColor={"#E1F7F5"} borderColor={"#000"} />
    </AdvancedMarker>
  ));
}

function BusRoutesComponent({ path }: { path: google.maps.LatLngLiteral[] }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("maps");
  const [polygonService, setPolygonService] = useState<google.maps.Polyline>();

  // Initialize the polyline service
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setPolygonService(new routesLibrary.Polyline({ map }));
    console.log("Init");
  }, [routesLibrary, map]);

  // Use polyline service to draw the path
  useEffect(() => {
    if (!polygonService || !map) return;
    const busPath: google.maps.LatLngLiteral[] = path.map(({ lat, lng }) => ({ lat, lng }));
    polygonService.setOptions({
      path: busPath,
      strokeColor: "darkblue",
      strokeOpacity: 1,
      strokeWeight: 8,
    });
  }, [polygonService, map, path]);

  return null;
}
