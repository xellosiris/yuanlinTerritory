import { GoogleMap } from "@react-google-maps/api";
import Territory from "./Terriotory";
import { useEffect, useState } from "react";

const Map = () => {
  const [geojsons, setGeojsons] = useState([]);
  const modules = import.meta.glob("../territories/*.geojson", {
    as: "raw",
    eager: true,
  });

  useEffect(() => {
    var gs = [];
    for (const path in modules) {
      gs.push(JSON.parse(modules[path]));
    }
    setGeojsons(gs);
  }, []);

  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 23.948507, lng: 120.45138 }}
      mapContainerClassName="w-screen h-screen"
    >
      {geojsons.map((geojson) => {
        const TerritoryNumber = geojson[0].features[0].properties.name;
        return (
          <Territory
            key={TerritoryNumber}
            geojson={geojson}
            number={TerritoryNumber}
          />
        );
      })}
    </GoogleMap>
  );
};

export default Map;
