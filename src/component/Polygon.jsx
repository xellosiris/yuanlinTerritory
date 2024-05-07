import { useMap } from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { LOCATIONS_BACKGROUNDS } from "../assets/locations";

export const MapPolygon = ({ territory, showBgColor, onSetTerritoryInfo }) => {
  const map = useMap();
  const { location, coordinates, lastStartDate } = territory;
  const [isHovered, setIsHovered] = useState(false);

  const polygonRef = useRef();

  const styles = {
    strokeColor: "black",
    strokeOpacity: 1,
    strokeWeight: showBgColor ? 1 : 4,
    fillColor: isHovered ? "black" : LOCATIONS_BACKGROUNDS[location],
    fillOpacity: showBgColor ? (lastStartDate ? 0.5 : 0.1) : 0,
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
