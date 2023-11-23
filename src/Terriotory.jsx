import { Fragment, useState } from "react";
import { MapLabel } from "./MapLabel";
import { MapPolygon } from "./MapPolygon";
import { TerritoryInfo } from "./TerritoryInfo";

const Territory = ({ territory, disableBgColor }) => {
  const [territoryInfo, setTerritoryInfo] = useState(null);

  return (
    <Fragment>
      <MapPolygon territory={territory} disableBgColor={disableBgColor} />
      <MapLabel territory={territory} />
      {!!territoryInfo && (
        <TerritoryInfo
          territory={territory}
          setTerritoryInfo={setTerritoryInfo}
        />
      )}
    </Fragment>
  );
};

export default Territory;
