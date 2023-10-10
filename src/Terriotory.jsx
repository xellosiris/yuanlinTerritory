import { Polygon } from "@react-google-maps/api";
import { useState } from "react";
const Territory = ({ geojson }) => {
  const path = geojson[0].features[0].geometry.coordinates[0].map((c) => ({
    lat: c[1],
    lng: c[0],
  }));

  const location = geojson[0].features[0].properties.location;

  const bgColor = {
    員林: "#364583",
    大村: "#2d681c",
    溪湖: "#ab4a3e",
    埔心: "#d8941c",
    二林: "#88ab10",
    芳苑: "#364583",
    大城: "#f3d744",
  };
  const [options, setOptions] = useState({
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: 1.2,
    fillColor: bgColor[location],
    fillOpacity: 0.15,
  });
  const onMouseOver = () => {
    setOptions((options) => ({
      ...options,
      fillColor: "black",
      strokeWeight: 3,
    }));
  };
  const onMouseOut = () => {
    setOptions((options) => ({
      ...options,
      fillColor: bgColor[location],
      strokeWeight: 1.2,
    }));
  };
  return (
    <Polygon
      path={path}
      options={options}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  );
};

export default Territory;
