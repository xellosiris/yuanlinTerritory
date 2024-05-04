import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import clsx from "clsx";
import { useMemo } from "react";
import { getCenter } from "./helpers";
export const MapLabel = ({ territory }) => {
  const map = useMap();
  const { zoom } = map;
  const { coordinates, name, status } = territory;
  const centerSpot = useMemo(() => {
    if (territory) {
      return getCenter(coordinates);
    }
  }, [territory, coordinates]);
  return (
    <AdvancedMarker
      className={clsx(zoom <= 12 && "text-[11px]", zoom > 12 && "text-xl", zoom > 15 && "text-3xl")}
      position={centerSpot}
    >
      <div className={clsx(status === "進行中" && "text-white", "flex items-center")}>{name}</div>
    </AdvancedMarker>
  );
};
