import { useGoogleMap } from "@react-google-maps/api";
import polylabel from "polylabel";
import { useEffect, useMemo, useRef } from "react";

export const MapLabel = ({ territory, position }) => {
  const map = useGoogleMap();
  const { name, coordinates, lastStartDate, lastEndDate } = territory;
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
      optimized: true,
      position: centerSpot ?? position,
      label: {
        className: "territory-number",
        text: name.toString(),
      },
      map,
      icon:
        !!lastStartDate && !lastEndDate
          ? null
          : "https://maps.gstatic.com/mapfiles/transparent.png",
    });

    return () => {
      markerRef.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLabel({
        className: "territory-number",
        text: name.toString(),
      });
    }
  }, [name]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setPosition(centerSpot ?? position);
    }
  }, [centerSpot, position]);
};
