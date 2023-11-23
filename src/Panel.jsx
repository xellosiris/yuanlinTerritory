import {
  Button,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import polylabel from "polylabel";
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
    <div className="w-1/4 h-[calc(100vh-87px)] print:hidden block">
      <List className="h-full overflow-y-auto">
        <ListItem disablePadding>
          <ListItemButton
            selected={seleted === null}
            onClick={() => onSelected(null)}
          >
            <ListItemText>全體區域</ListItemText>
          </ListItemButton>
        </ListItem>
        {territories
          .sort((a, b) => a.name - b.name)
          .map((territory) => (
            <ListItem disablePadding key={territory.name}>
              <ListItemButton
                selected={territory.name === seleted?.name}
                onClick={() =>
                  onSelected({
                    name: territory.name,
                    center: getCenter(territory.coordinates),
                    zoom: 16,
                  })
                }
              >
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
