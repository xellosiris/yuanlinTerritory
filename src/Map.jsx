import FileDownloadIcon from "@mui/icons-material/FileDownload";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Map } from "@vis.gl/react-google-maps";

import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { Fragment, useState } from "react";
import useGoogleSheets from "use-google-sheets";
import Panel from "./Panel";
import Territory from "./Terriotory";

const MapContent = () => {
  const { data, loading, error } = useGoogleSheets({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    sheetId: import.meta.env.VITE_SHEET_ID,
    sheetsOptions: [{ id: "區域彙整", headerRowIndex: 1 }],
  });
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [disableBgColor, setdisableBgColor] = useState(true);
  const territories = data[0]?.data.map((t) => ({
    ...t,
    coordinates: JSON.parse(t.coordinates),
  }));
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
    canvas.toBlob((blob) =>
      saveAs(blob, `區域${selected?.name ?? "全體區域"}號.png`),
    );
  };
  return (
    <div className="flex">
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!!territories && (
        <Fragment>
          <Map
            className="relative h-screen w-full"
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            defaultCenter={
              selected?.center ?? { lat: 23.948507, lng: 120.45138 }
            }
            defaultZoom={selected?.zoom ?? 12}
            mapId="yuanlin"
          >
            <div className="absolute left-0 top-0 hidden bg-white p-3 text-3xl print:block">
              區域號碼：{selected?.name ?? "全體區域"}
            </div>
            {!selected &&
              territories.map((territory) => (
                <Territory key={territory.name} territory={territory} />
              ))}
            {!!selected && (
              <Territory
                key={selected}
                disableBgColor={disableBgColor}
                territory={territories.find(
                  (territory) => territory.name === selected.name,
                )}
              />
            )}
            <div className="absolute left-2 top-2 flex flex-col gap-2 print:hidden">
              <div className="rounded-full bg-gray-500">
                <IconButton onClick={() => setOpen(!open)}>
                  <MenuIcon className="text-white" />
                </IconButton>
              </div>

              <div
                className={`rounded-full ${!!selected ? "bg-slate-800" : "bg-gray-300"} `}
              >
                <IconButton disabled={!selected} onClick={onDownload}>
                  <FileDownloadIcon className="text-white" />
                </IconButton>
              </div>
            </div>
          </Map>

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

export default MapContent;
