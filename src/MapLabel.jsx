import { useGoogleMap } from '@react-google-maps/api';
import polylabel from 'polylabel';
import { useEffect, useMemo, useRef } from 'react';

export const MapLabel = ({ geojson, position, label }) => {
  const map = useGoogleMap();

  const centerSpot = useMemo(() => {
    if (geojson) {
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
      optimized: true,
      position: centerSpot ?? position,
      label: {
        className: 'territory-number',
        text: label,
      },
      map,
      icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
    });

    return () => {
      markerRef.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setLabel({
        className: 'territory-number',
        text: label,
      });
    }
  }, [label]);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.setPosition(centerSpot ?? position);
    }
  }, [centerSpot, position]);
};
