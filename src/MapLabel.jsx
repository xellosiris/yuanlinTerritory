import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import clsx from "clsx";
import { useMemo } from "react";
import { getCenter } from "./helpers";
export const MapLabel = ({ territory }) => {
  const map = useMap();
  const { zoom } = map;
  const { coordinates, name, status } = territory;
  const scale = zoom <= 12 ? "small" : zoom > 12 ? "medium" : zoom > 15 ? null : "large";
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
      <div className="flex items-center gap-1">
        {status === "進行中" && <DirectionsRunIcon fontSize={scale} className="text-white" />}
        {name}
      </div>
    </AdvancedMarker>
  );
};
