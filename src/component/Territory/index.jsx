import { Fragment, useState } from "react";
import { MapLabel } from "../Label";
import { MapPolygon } from "../Polygon";
import { TerritoryInfo } from "./Info";
const Territory = ({ territory, showBgColor = true }) => {
  const [territoryInfo, setTerritoryInfo] = useState(null);
  const onSetTerritoryInfo = (territory) => {
    setTerritoryInfo(territory);
  };

  const onClose = () => {
    setTerritoryInfo(null);
  };

  return (
    <Fragment>
      <MapPolygon territory={territory} showBgColor={showBgColor} onSetTerritoryInfo={onSetTerritoryInfo} />
      <MapLabel territory={territory} />
      {!!territoryInfo && <TerritoryInfo territory={territory} onClose={onClose} />}
    </Fragment>
  );
};

export default Territory;
