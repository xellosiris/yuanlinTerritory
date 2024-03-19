import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import clsx from "clsx";
import polylabel from "polylabel";
import { useMemo } from "react";

export const MapLabel = ({ territory }) => {
  const map = useMap();
  const { zoom } = map;
  const { coordinates, name, status } = territory;
  const scale = zoom <= 12 ? 0.6 : zoom > 12 ? 1 : zoom > 15 ? null : 0.8;
  const centerSpot = useMemo(() => {
    if (territory) {
      const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
      return {
        lat: p[1],
        lng: p[0],
      };
    }
  }, [territory, coordinates]);
  return (
    <AdvancedMarker
      className={clsx(
        zoom <= 12 && "text-[11px]",
        zoom > 12 && "text-xl",
        zoom > 15 && "text-3xl",
      )}
      position={centerSpot}
    >
      {status === "進行中" && (
        <Pin
          scale={scale}
          background={"#FBBC04"}
          glyphColor={"#000"}
          borderColor={"#000"}
        />
      )}
      {name}
    </AdvancedMarker>
  );
};
