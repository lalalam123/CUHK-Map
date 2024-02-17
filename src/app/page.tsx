import React from "react";
import Map from "../components/map";
import Location from "../components/geolocation";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Location />
      <Map />
    </div>
  );
};

export default HomePage;
