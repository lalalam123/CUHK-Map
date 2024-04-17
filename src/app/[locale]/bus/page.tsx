"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Badge } from "@nextui-org/react";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTime } from "react-timer-hook";
import Holidays from "date-holidays";

import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

import {
  BusStops,
  BusStopsPath,
  BusRoutes,
  BusStopType,
  BusStopsPathType,
  BusRouteType,
} from "./data";

const containerStyle = {
  width: "100%",
  height: "100vh",
  borderColor: "black",
};

const center = {
  lat: 22.416389,
  lng: 114.211111,
};

const BusPage: React.FC = () => {
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

    const stops = stopsSequence
      .map((stop) => BusStops.find((busStop) => busStop.stop_id === stop))
      .filter((stop) => stop !== undefined);

    setPointToDisplay(stops);
    setPathToDisplay(path);
  }, [routeIndex]);

  return (
    <div>
      <BusRouteSwitcherButtonGroups
        routeIndex={routeIndex}
        BusRoutes={BusRoutes}
        setRouteIndex={setRouteIndex}
      />
      {/* <p>{routeIndex}</p>
      <p>
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours ||
          "No information available"}
      </p>
      <p>
        School Bus {routeIndex} operates from{" "}
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours || "00:00"} to{" "}
        {BusRoutes.find((route) => route.name === routeIndex)?.serviceHours || "23:59"}
        {BusRoutes.find((route) => route.name === routeIndex)?.isWeekdayOnly && " (Weekdays Only)"}
      </p> */}
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

export default BusPage;

function BusRouteSwitcherButtonGroups({
  routeIndex,
  BusRoutes,
  setRouteIndex,
}: {
  routeIndex: string;
  BusRoutes: BusRouteType[];
  setRouteIndex: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("Bus");
  const hd = new Holidays("HK");

  // Run time
  const { minutes, hours } = useTime();
  const td = new Date();
  const isHoliday = Array.isArray(hd.isHoliday(td)) || td.getDay() === 0 ? true : false;

  // Test time
  // const minutes = 20;
  // const hours = 12;
  // const tmp = new Date();
  // const td = new Date(tmp.setDate(tmp.getDate() + 3));
  // const isHoliday = Array.isArray(hd.isHoliday(td)) || td.getDay() === 0 ? true : false;

  const isServiceHours = useCallback(
    ({
      currentMinutes,
      currentHours,
      serviceHours,
    }: {
      currentMinutes: number;
      currentHours: number;
      serviceHours: string;
    }) => {
      const currentTime = currentHours * 60 + currentMinutes;
      const serviceHoursStarTime =
        parseInt(serviceHours.split("-")[0].split(":")[0]) * 60 +
        parseInt(serviceHours.split("-")[0].split(":")[1]);
      const serviceHoursEndTime =
        parseInt(serviceHours.split("-")[1].split(":")[0]) * 60 +
        parseInt(serviceHours.split("-")[1].split(":")[1]);
      return currentTime >= serviceHoursStarTime && currentTime <= serviceHoursEndTime;
    },
    []
  );

  const sortedBusRoutes = [...BusRoutes].sort((a, b) => {
    const aIsInService =
      isServiceHours({
        currentHours: hours,
        currentMinutes: minutes,
        serviceHours: a.serviceHours,
      }) &&
      ((isHoliday && !a.isWeekdayOnly) || (!isHoliday && a.isWeekdayOnly));

    const bIsInService =
      isServiceHours({
        currentHours: hours,
        currentMinutes: minutes,
        serviceHours: b.serviceHours,
      }) &&
      ((isHoliday && !b.isWeekdayOnly) || (!isHoliday && b.isWeekdayOnly));

    if (aIsInService && !bIsInService) {
      return -1;
    }
    if (!aIsInService && bIsInService) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "scroll",
          whiteSpace: "nowrap",
          marginLeft: "1.5rem",
          marginRight: "1.5rem",
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
          padding: "0.5rem",
        }}
      >
        {sortedBusRoutes.map((route, index) => (
          <Badge
            key={index}
            content={routeIndex === route.name ? "🚌" : ""}
            color={
              !isServiceHours({
                currentHours: hours,
                currentMinutes: minutes,
                serviceHours: route.serviceHours,
              }) || isHoliday === route.isWeekdayOnly
                ? "default"
                : "success"
            }
            shape="circle"
            placement={routeIndex === route.name ? "top-left" : "bottom-right"}
          >
            <Button
              // key={index}
              onClick={() => {
                setRouteIndex(route.name);
                Swal.fire({
                  title:
                    !isServiceHours({
                      currentHours: hours,
                      currentMinutes: minutes,
                      serviceHours: route.serviceHours,
                    }) || isHoliday === route.isWeekdayOnly
                      ? `${t("bus")} ${route.name} ${t("isNotService")}`
                      : `${t("bus")} ${route.name} ${t("isService")}`,
                  text: `${t("serviceTime")}: ${route.serviceHours}`,
                  icon:
                    !isServiceHours({
                      currentHours: hours,
                      currentMinutes: minutes,
                      serviceHours: route.serviceHours,
                    }) || isHoliday === route.isWeekdayOnly
                      ? "warning"
                      : "success",
                  confirmButtonColor: "#000",
                });
              }}
              size="md"
              style={{
                margin: "10px",
                background: route.bgColor,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {`${t("bus")} ${route.name}`}
            </Button>
          </Badge>
        ))}
      </div>
      {/* <h1> {isHoliday ? "Today is a holiday" : "Today is not a holiday"} </h1>
      <h1> {td.getDay() + " " + td.getDate() + " " + td.getMonth()}</h1> */}
    </>
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
        showSwal({
          title: stops.name,
          text: `Next Bus: 1A in 5 Mins`,
          imageUrl: stops?.imageUrl || "",
        });
      }}
    >
      <Pin background={"#8B008B"} glyphColor={"#E1F7F5"} borderColor={"#000"} scale={1.5}>
        {/* <h1>{index + 1}</h1> */}
        <h1>{stops.stop_id}</h1>
      </Pin>
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
      strokeColor: "#800000",
      strokeOpacity: 1,
      strokeWeight: 8,
      clickable: true,
    });
  }, [polygonService, map, path]);

  return null;
}
