import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import html2canvas from "html2canvas";
import polylabel from "polylabel";
import { saveAs } from "file-saver";
const Panel = ({
  territories,
  seleted,
  onSelected,
  disableBgColor,
  ondisableBgColor,
}) => {
  const getCenter = (coordinates) => {
    const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
    return {
      lat: p[1],
      lng: p[0],
    };
  };

  const onDownload = async () => {
    const canvas = await html2canvas(document.querySelector("#TerritoryMap"), {
      useCORS: true,
    });
    canvas.toBlob((blob) =>
      saveAs(blob, `區域${seleted?.name ?? "全體區域"}號.png`)
    );
  };
  return (
    <div className="w-1/4 print:hidden block">
      <List className="h-[calc(100vh-90px)] overflow-y-auto">
        <ListItem
          className={`${seleted === null && "bg-slate-400"}`}
          disablePadding
          onClick={() => onSelected(null)}
        >
          <ListItemButton>
            <ListItemText>全體區域</ListItemText>
          </ListItemButton>
        </ListItem>
        {territories
          .sort((a, b) => a.name - b.name)
          .map((territory) => (
            <ListItem
              className={`${
                territory.name === seleted?.name ? "bg-slate-400" : ""
              }`}
              disablePadding
              onClick={() =>
                onSelected({
                  name: territory.name,
                  center: getCenter(territory.coordinates),
                  zoom: 16,
                })
              }
              key={territory.name}
            >
              <ListItemButton>
                <ListItemText>{territory.name}號</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <div className="space-y-2">
        <FormControlLabel
          control={
            <Checkbox
              checked={disableBgColor}
              onChange={(e, checked) => ondisableBgColor(checked)}
            />
          }
          label="不顯示背景顏色"
        />
        <Button
          className="w-full"
          disabled={seleted === null}
          variant="contained"
          onClick={onDownload}
        >
          下載圖片
        </Button>
      </div>
    </div>
  );
};

export default Panel;
