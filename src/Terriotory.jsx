import { Fragment, useState } from "react";
import { MapLabel } from "./MapLabel";
import { MapPolygon } from "./MapPolygon";
import { TerritoryInfo } from "./TerritoryInfo";
const Territory = ({ territory, disableBgColor }) => {
  const [territoryInfo, setTerritoryInfo] = useState(null);
  const onSetTerritoryInfo = (territory) => {
    setTerritoryInfo(territory);
  };

  const onClose = () => {
    setTerritoryInfo(null);
  };

  return (
    <Fragment>
      <MapPolygon territory={territory} disableBgColor={disableBgColor} onSetTerritoryInfo={onSetTerritoryInfo} />
      <MapLabel territory={territory} />
      {!!territoryInfo && <TerritoryInfo territory={territory} onClose={onClose} />}
    </Fragment>
  );
};

export default Territory;
