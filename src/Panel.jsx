import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

import polylabel from "polylabel";
const Panel = ({ territories, selected, onSelected, onClose, disableBgColor, onDisableBgColor }) => {
  const groupedTerritories = territories
    .sort((a, b) => a.name - b.name)
    .reduce((group, territory) => {
      const { location } = territory;
      group[location] = group[location] ?? [];
      group[location].push(territory);
      return group;
    }, {});

  const locations = ["員林", "大村", "埔心", "溪湖", "二林", "芳苑", "大城"];

  const getCenter = (coordinates) => {
    const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
    return {
      lat: p[1],
      lng: p[0],
    };
  };

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>請選擇區域</DialogTitle>
      <DialogContent>
        <List className="flex-auto overflow-y-auto" subheader={<li />}>
          <ListItem disablePadding>
            <ListItemButton selected={selected === null} onClick={() => onSelected(null)}>
              <ListItemText>全體區域</ListItemText>
            </ListItemButton>
          </ListItem>
          {JSON.stringify(groupedTerritories) !== "{}" &&
            locations.map((location) => (
              <li key={location}>
                <ul>
                  <ListSubheader>{location}</ListSubheader>
                  {groupedTerritories[location].map((territory) => (
                    <ListItem disablePadding key={territory.name}>
                      <ListItemButton
                        selected={territory.name === selected?.name}
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
                </ul>
              </li>
            ))}
        </List>
      </DialogContent>
      <DialogActions>
        <FormControlLabel
          control={<Checkbox checked={disableBgColor} onChange={(e, checked) => onDisableBgColor(checked)} />}
          label="不顯示背景顏色"
        />
      </DialogActions>
    </Dialog>
  );
};

export default Panel;
