"use client";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useGeoLocation } from "@custom-react-hooks/all";
import {
  APIProvider,
  Map,
  useMap,
  useMapsLibrary,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

const StyledMarker = styled(AdvancedMarker)`
  background-color: blue;
  border: 3px solid white;
  border-radius: 50%;
  box-shadow: 0 0 10px blue;
  animation: ${pulse} 2s infinite;
`;

export const CurrentLocationPointer = () => {
  const { loading, coordinates } = useGeoLocation();
  return (
    !loading &&
    coordinates && (
      <StyledMarker position={{ lat: coordinates?.latitude, lng: coordinates?.longitude }}>
        `&#34;`
      </StyledMarker>
    )
  );
};
