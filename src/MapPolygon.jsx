import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useMemo } from "react";
import { useEffect, useRef, useState } from "react";

const bgColor = {
  員林: "#364583",
  大村: "#2d681c",
  溪湖: "#ab4a3e",
  埔心: "#d8941c",
  二林: "#88ab10",
  芳苑: "#364583",
  大城: "#f3d744",
};

export const MapPolygon = ({
  territory,
  disableBgColor,
  onSetTerritoryInfo,
}) => {
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const core = useMapsLibrary("core");
  const { location, coordinates, lastStartDate } = territory;
  const [isHovered, setIsHovered] = useState(false);
  const polygon = useRef(new maps.Polygon()).current;
  const styles = {
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: disableBgColor || isHovered ? 3 : 1.2,
    fillColor: isHovered ? "black" : bgColor[location],
    fillOpacity: disableBgColor ? 0 : lastStartDate ? 0.5 : 0.1,
  };

  useMemo(() => {
    const polygonOptions = {
      paths: coordinates,
      map,
      clickable: true,
      ...styles,
    };
    polygon.setOptions(polygonOptions);
  }, [polygon, map, styles]);
  useEffect(() => {
    core.event.addListener(polygon, "mouseover", () => {
      setIsHovered(true);
    });

    core.event.addListener(polygon, "mouseout", () => {
      setIsHovered(false);
    });

    core.event.addListener(polygon, "click", () => {
      onSetTerritoryInfo(territory);
    });

    return () => {
      polygon.setMap(null);
      core.event.clearInstanceListeners(polygon);
    };
  }, [core]);

  return null;
};
