import { Polygon } from "@react-google-maps/api";
import { Fragment, useMemo, useState } from "react";
import { MapLabel } from "./MapLabel";
import { TerritoryInfo } from "./TerritoryInfo";
const bgColor = {
  員林: "#364583",
  大村: "#2d681c",
  溪湖: "#ab4a3e",
  埔心: "#d8941c",
  二林: "#88ab10",
  芳苑: "#364583",
  大城: "#f3d744",
};

const Territory = ({ territory }) => {
  const { location, coordinates } = territory;
  const [isHovered, setIsHovered] = useState(false);
  const [territoryInfo, setTerritoryInfo] = useState(null);
  const onMouseOver = () => setIsHovered(true);
  const onMouseOut = () => setIsHovered(false);

  const style = useMemo(
    () => ({
      strokeColor: "black",
      strokeOpacity: 1,
      strokeWeight: isHovered ? 3 : 1.2,
      fillColor: isHovered ? "black" : bgColor[location],
      fillOpacity: 0.15,
    }),
    [isHovered, location]
  );

  return (
    <Fragment>
      <Polygon
        path={coordinates}
        options={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={() => setTerritoryInfo(territory)}
      />
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
