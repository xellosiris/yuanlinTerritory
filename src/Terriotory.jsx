import { Polygon } from "@react-google-maps/api";
import { Fragment, useState, useEffect, useMemo } from "react";
import polylabel from "polylabel";
import { MapLabel } from "./MapLabel";
import { useGoogleMap } from "@react-google-maps/api";
const Territory = ({ geojson, number }) => {
  const map = useGoogleMap();
  const [zoom, setZoom] = useState(map?.getZoom());
  const [bounds, setBounds] = useState(map?.getBounds());
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
  useEffect(() => {
    if (map) {
      const $ = map.addListener("zoom_changed", () => {
        setZoom(map.getZoom());
      });
      return () => $.remove();
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      const $ = map.addListener("bounds_changed", () => {
        setBounds(map.getBounds());
      });
      return () => $.remove();
    }
  }, [map]);

  const centerSpot = useMemo(() => {
    if (!!geojson) {
      const p = polylabel(geojson[0].features[0].geometry.coordinates);
      return {
        lat: p[1],
        lng: p[0],
      };
    }
  }, [geojson]);

  return (
    <Fragment>
      {!!bounds && path.filter((p) => bounds.contains(p).length > 0) && (
        <Polygon
          path={path}
          options={options}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        />
      )}
      {zoom > 13 && !!bounds && bounds.contains(centerSpot) && (
        <MapLabel geojson={geojson} label={number.toString()} zoom={zoom} />
      )}
    </Fragment>
  );
};

export default Territory;
