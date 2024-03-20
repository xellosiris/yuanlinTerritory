import { useMap } from "@vis.gl/react-google-maps";
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

export const MapPolygon = ({ territory, disableBgColor, onSetTerritoryInfo }) => {
  const map = useMap();
  const { location, coordinates, lastStartDate } = territory;
  const [isHovered, setIsHovered] = useState(false);

  const polygonRef = useRef();

  const styles = {
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: disableBgColor || isHovered ? 3 : 1.2,
    fillColor: isHovered ? "black" : bgColor[location],
    fillOpacity: disableBgColor ? 0 : lastStartDate ? 0.5 : 0.1,
  };

  useEffect(() => {
    const poly = (polygonRef.current = new window.google.maps.Polygon({
      paths: coordinates,
      map,
      clickable: true,
      ...styles,
    }));

    const $over = window.google.maps.event.addListener(poly, "mouseover", () => {
      setIsHovered(true);
    });

    const $out = window.google.maps.event.addListener(poly, "mouseout", () => {
      setIsHovered(false);
    });

    const $click = window.google.maps.event.addListener(poly, "click", () => {
      onSetTerritoryInfo(territory);
    });

    return () => {
      poly.setMap(null);
      window.google.maps.event.removeListener($over);
      window.google.maps.event.removeListener($click);
    };
  }, [coordinates, map, styles]);

  useEffect(() => {
    polygonRef.current?.setOptions(styles);
  }, [isHovered]);

  return null;
};
