import { GoogleMap, useGoogleMap } from '@react-google-maps/api';
import Territory from './Terriotory';
import { useEffect, useState } from 'react';

const geoJsons = Object.values(
  import.meta.glob('../territories/*.geojson', {
    as: 'raw',
    eager: true,
  })
);

const Map = () => {
  const [territories, setTerritories] = useState([]);
  useEffect(() => {
    setTerritories(geoJsons.map((json) => JSON.parse(json)));
  }, []);

  return (
    <GoogleMap
      zoom={12}
      center={{ lat: 23.948507, lng: 120.45138 }}
      mapContainerClassName="w-screen h-screen"
    >
      <ZoomHandler />
      {territories.map((geojson, index) => (
        <Territory key={index} geojson={geojson} />
      ))}
    </GoogleMap>
  );
};

export default Map;

function ZoomHandler() {
  const map = useGoogleMap();
  useEffect(() => {
    if (map) {
      const $ = map.addListener('zoom_changed', () => {
        const zoom = map.getZoom();
        if (zoom <= 13) {
          document.body.classList.add('hide-number');
        } else {
          document.body.classList.remove('hide-number');
          document.body.style.setProperty(
            '--number-size',
            zoom > 15 ? '50px' : '20px'
          );
        }
      });

      return () => {
        $.remove();
      };
    }
  }, [map]);

  return null;
}
