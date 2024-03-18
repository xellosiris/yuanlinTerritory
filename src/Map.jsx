import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { GoogleMap, useGoogleMap } from "@react-google-maps/api";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { Fragment, useEffect, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import Panel from "./Panel";
import Territory from "./Terriotory";
const Map = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    sheetId: import.meta.env.VITE_SHEET_ID,
    sheetsOptions: [{ id: "區域彙整", headerRowIndex: 1 }],
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [disableBgColor, setdisableBgColor] = useState(true);
  const territories = data[0]?.data.map((t) => ({ ...t, coordinates: JSON.parse(t.coordinates) }));
  const onSelected = (obj) => {
    setSelected(obj);
    setOpen(false);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onDownload = async () => {
    const canvas = await html2canvas(document.querySelector("#TerritoryMap"), {
      useCORS: true,
    });
    canvas.toBlob((blob) => saveAs(blob, `區域${selected?.name ?? "全體區域"}號.png`));
  };

  return (
    <div className="flex">
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!!territories && (
        <Fragment>
          <GoogleMap
            id="TerritoryMap"
            mapContainerClassName="w-full h-screen relative"
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
            {!selected && territories.map((territory) => <Territory key={territory.name} territory={territory} />)}
            {!!selected && (
              <Territory
                key={selected}
                disableBgColor={disableBgColor}
                territory={territories.find((territory) => territory.name === selected.name)}
              />
            )}
            <div className="flex flex-col gap-2 absolute top-2 left-2 print:hidden">
              <div className="rounded-full bg-gray-500">
                <IconButton onClick={() => setOpen(!open)}>
                  <MenuIcon className="text-white" />
                </IconButton>
              </div>

              <div className={`rounded-full ${!!selected ? "bg-slate-800" : "bg-gray-300"} `}>
                <IconButton disabled={!selected} onClick={onDownload}>
                  <FileDownloadIcon className="text-white" />
                </IconButton>
              </div>
            </div>
          </GoogleMap>

          {open && (
            <Panel
              territories={territories}
              onSelected={onSelected}
              onClose={onClose}
              disableBgColor={disableBgColor}
              ondisableBgColor={(b) => setdisableBgColor(b)}
              seleted={selected}
            />
          )}
        </Fragment>
      )}
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
          document.body.style.setProperty("--number-size", zoom > 15 ? "50px" : "20px");
        }
      });

      return () => {
        $.remove();
      };
    }
  }, [map]);

  return null;
}
