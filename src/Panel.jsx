import {
  Button,
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
  TextField,
} from "@mui/material";
import { Fragment, useState } from "react";
import { getCenter } from "./helpers";

const Panel = ({
  territories,
  selected,
  onSelected,
  onClose,
  disableBgColor,
  onDisableBgColor,
  showPinPublisher,
  setShowPinPublisher,
  onPasswordVerify,
}) => {
  const groupedTerritories = territories
    .sort((a, b) => a.name - b.name)
    .reduce((group, territory) => {
      const { location } = territory;
      group[location] = group[location] ?? [];
      group[location].push(territory);
      return group;
    }, {});
  const [password, setPassword] = useState("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const locations = ["員林", "大村", "埔心", "溪湖", "二林", "芳苑", "大城"];

  return (
    <Fragment>
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
                              coordinates: territory.coordinates,
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
          <FormControlLabel
            control={
              <Checkbox
                checked={showPinPublisher}
                onChange={() => {
                  if (showPinPublisher) {
                    setShowPinPublisher(false);
                  } else {
                    setPasswordDialog(true);
                  }
                }}
              />
            }
            label="顯示傳道員分佈"
          />
        </DialogActions>
      </Dialog>
      {passwordDialog && (
        <Dialog open>
          <DialogTitle>請輸入密碼</DialogTitle>
          <DialogContent>
            <TextField type="password" label="密碼" value={password} onChange={(e) => setPassword(e.target.value)} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => onPasswordVerify(password, setPasswordDialog)}>送出</Button>
          </DialogActions>
        </Dialog>
      )}
    </Fragment>
  );
};

export default Panel;
