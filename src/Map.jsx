import { GoogleMap, useGoogleMap } from "@react-google-maps/api";
import { collection, getDocs } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Panel from "./Panel";
import Territory from "./Terriotory";
const Map = () => {
  const [territories, setTerritories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [disableBgColor, setdisableBgColor] = useState(true);
  const getTerritories = async () => {
    const snapshot = await getDocs(collection(db, "Territories"));
    const docs = snapshot.docs.map((doc) => doc.data());
    setTerritories(docs);
  };

  const onSelected = (obj) => {
    setSelected(obj);
  };

  useEffect(() => {
    getTerritories();
  }, []);
  return (
    <div className="flex">
      <GoogleMap
        id="TerritoryMap"
        mapContainerClassName="print:w-full w-3/4 h-screen"
        options={{
          center: selected?.center ?? { lat: 23.948507, lng: 120.45138 },
          zoom: selected?.zoom ?? 12,
          disableDefaultUI: true,
        }}
      >
        <div className="absolute top-0 left-0 text-3xl print:block hidden bg-white p-3">
          區域號碼：{selected?.name ?? "全體區域"}
        </div>
        <ZoomHandler />
        {!selected &&
          territories.map((territory) => (
            <Territory key={territory.name} territory={territory} />
          ))}
        {!!selected && (
          <Territory
            key={selected}
            disableBgColor={disableBgColor}
            territory={territories.find(
              (territory) => territory.name === selected.name
            )}
          />
        )}
      </GoogleMap>

      <Panel
        territories={territories}
        onSelected={onSelected}
        disableBgColor={disableBgColor}
        ondisableBgColor={(b) => setdisableBgColor(b)}
        seleted={selected}
      />
    </div>
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
