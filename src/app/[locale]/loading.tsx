import React from "react";
import { MapLoadingWidget } from "@/components/loadingWidget";

const LoadingPage: React.FC = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <MapLoadingWidget />
    </div>
  );
};

export default LoadingPage;
