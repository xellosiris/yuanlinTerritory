import { Polygon } from '@react-google-maps/api';
import { Fragment, useMemo, useState } from 'react';
import { MapLabel } from './MapLabel';

const bgColor = {
  員林: '#364583',
  大村: '#2d681c',
  溪湖: '#ab4a3e',
  埔心: '#d8941c',
  二林: '#88ab10',
  芳苑: '#364583',
  大城: '#f3d744',
};

const Territory = ({ geojson }) => {
  const path = useMemo(
    () =>
      geojson[0].features[0].geometry.coordinates[0].map((c) => ({
        lat: c[1],
        lng: c[0],
      })),
    [geojson]
  );

  const { name, location } = geojson[0].features[0].properties;
  const [isHovered, setIsHovered] = useState(false);

  const onMouseOver = () => setIsHovered(true);
  const onMouseOut = () => setIsHovered(false);

  const style = useMemo(
    () => ({
      strokeColor: 'black',
      strokeOpacity: 1,
      strokeWeight: isHovered ? 3 : 1.2,
      fillColor: isHovered ? 'black' : bgColor[location],
      fillOpacity: 0.15,
    }),
    [isHovered, location]
  );

  return (
    <Fragment>
      <Polygon
        path={path}
        options={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      />
      <MapLabel geojson={geojson} label={name.toString()} />
    </Fragment>
  );
};

export default Territory;
