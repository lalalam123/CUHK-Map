import React from "react";
import { MapLoadingWidget } from "@/components/loadingWidget";

const LoadingPage: React.FC = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
    >
      <h1>Loading ... 等一陣 ;)</h1>
    </div>
  );
};

export default LoadingPage;
