import { useGoogleMap } from "@react-google-maps/api";
import polylabel from "polylabel";
import { useEffect, useMemo, useRef } from "react";

export const MapLabel = ({ geojson, position, label, zoom }) => {
  const map = useGoogleMap();

  // useEffect(() => {
  //   if (map) {
  //     const $ = map.addListener("zoom_changed", () => {
  //       setZoom(map.getZoom());
  //     });
  //     return () => $.remove();
  //   }
  // }, [map]);

  const centerSpot = useMemo(() => {
    if (!!geojson) {
      const p = polylabel(geojson[0].features[0].geometry.coordinates);
      return {
        lat: p[1],
        lng: p[0],
      };
    }
  }, [geojson]);
  const markerRef = useRef();

  useEffect(() => {
    markerRef.current = new window.google.maps.Marker({
      position: centerSpot ?? position,
      label: {
        text: label,
        fontSize: "20px",
      },
      map,
      icon: "t.png",
    });

    return () => {
      markerRef.current.setMap(null);
    };
  }, []);

  const labelFontSize = useMemo(() => {
    return zoom > 15 ? "50px" : "20px";
  }, [zoom]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLabel({
        text: label,
        fontSize: labelFontSize,
      });
    }
  }, [label, labelFontSize]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setPosition(centerSpot ?? position);
    }
  }, [centerSpot, position]);
};
