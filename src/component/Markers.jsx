import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import { Fragment, useEffect, useRef, useState } from "react";
import { getLocationsBackground } from "../assets/locations";

const Markers = ({ data, active }) => {
  const map = useMap();
  const [markers, setMarkers] = useState({});
  const clusterer = useRef(null);
  const [addressInfo, setAddressInfo] = useState(null);
  const setMarkerRef = (marker, key) => {
    if (marker && markers[key]) return;
    if (!marker && !markers[key]) return;
    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker };
      } else {
        const newMarkers = { ...prev };
        delete newMarkers[key];
        return newMarkers;
      }
    });
  };

  useEffect(() => {
    if (markers.length === 0) {
      clusterer.current?.clearMarkers();

      return;
    }
    clusterer.current?.clearMarkers();
    clusterer.current?.addMarkers(Object.values(markers));
  }, [markers]);

  useEffect(() => {
    if (!map) return;
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map });
    }
  }, [map]);
  return active ? (
    <Fragment>
      {addressInfo && (
        <Dialog open onClose={() => setAddressInfo(null)}>
          <DialogTitle>傳道員資訊</DialogTitle>
          <DialogContent className="flex flex-col gap-2">
            <p>地址：{addressInfo.address}</p>
            <p>所屬小組：{addressInfo.group}</p>
            <p>居住成員：{addressInfo.members}</p>
          </DialogContent>
        </Dialog>
      )}
      {data.map((location) => (
        <AdvancedMarker
          key={location.address}
          position={location.coordinates}
          onClick={() => setAddressInfo(location)}
          ref={(marker) => setMarkerRef(marker, location.address)}
        >
          <Pin background={getLocationsBackground(location.address)} glyphColor={"#fff"} />
        </AdvancedMarker>
      ))}
    </Fragment>
  ) : null;
};

export default Markers;
