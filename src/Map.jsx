import { GoogleMap, useGoogleMap } from "@react-google-maps/api";
import Territory from "./Terriotory";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore/lite";

const Map = () => {
  const [territories, setTerritories] = useState([]);
  const getTerritories = async () => {
    const snapshot = await getDocs(collection(db, "Territories"));
    const docs = snapshot.docs.map((doc) => doc.data());
    setTerritories(docs);
  };
  useEffect(() => {
    getTerritories();
  }, []);

  return (
    <GoogleMap
      mapContainerClassName="w-screen h-screen"
      options={{
        center: { lat: 23.948507, lng: 120.45138 },
        zoom: 12,
        restriction: {
          latLngBounds: {
            north: 24.042009,
            south: 23.810006,
            east: 120.635806,
            west: 120.241796,
          },
        },
      }}
    >
      <ZoomHandler />
      {territories.map((territory) => (
        <Territory key={territory.name} territory={territory} />
      ))}
    </GoogleMap>
  );
};

export default Map;

function ZoomHandler() {
  const map = useGoogleMap();
  useEffect(() => {
    if (map) {
      const $ = map.addListener("zoom_changed", () => {
        const zoom = map.getZoom();
        if (zoom <= 13) {
          document.body.classList.add("hide-number");
        } else {
          document.body.classList.remove("hide-number");
          document.body.style.setProperty(
            "--number-size",
            zoom > 15 ? "50px" : "20px"
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
