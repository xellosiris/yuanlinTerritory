import { useGoogleMap } from "@react-google-maps/api";
import polylabel from "polylabel";
import { useEffect, useMemo, useRef } from "react";

export const MapLabel = ({ territory }) => {
  const map = useGoogleMap();
  const { name, coordinates, status } = territory;
  const centerSpot = useMemo(() => {
    if (territory) {
      const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
      return {
        lat: p[1],
        lng: p[0],
      };
    }
  }, [territory]);

  const markerRef = useRef();

  useEffect(() => {
    markerRef.current = new window.google.maps.Marker({
      position: centerSpot,
      label: {
        className: "territory-number",
        text: name.toString(),
      },
      map,
      icon: status !== "進行中" ? "https://maps.gstatic.com/mapfiles/transparent.png" : null,
    });

    return () => {
      markerRef.current.setMap(null);
    };
  }, [status, name, centerSpot, map]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLabel({
        className: "territory-number",
        text: name.toString(),
      });
    }
  }, [name]);
};
