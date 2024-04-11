import { SetStateAction, createContext } from "react";
import React from "react";

// Context for draw path from departure to destination
export const DepartureContext = createContext<any>(null);
export const DestinationContext = createContext<any>(null);

// Context for zooming and centering the map
type ZoomContextType = {
  zoom: number | undefined;
  setZoom: React.Dispatch<SetStateAction<number>> | undefined;
};
export const ZoomContext = createContext<ZoomContextType>({ zoom: undefined, setZoom: undefined });

type CenterContextType = {
  center: google.maps.LatLngLiteral | undefined;
  setCenter: React.Dispatch<SetStateAction<google.maps.LatLngLiteral>> | undefined;
};
export const CenterContext = createContext<CenterContextType>({
  center: undefined,
  setCenter: undefined,
});
