import {
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";

const TerritorySelect = ({ territories, selected, onSelected, onClose }) => {
  const groupedTerritories = territories
    .sort((a, b) => a.name - b.name)
    .reduce((group, territory) => {
      const { location } = territory;
      group[location] = group[location] ?? [];
      group[location].push(territory);
      return group;
    }, {});

  const locations = ["員林", "大村", "埔心", "溪湖", "二林", "芳苑", "大城"];

  return (
    <Dialog open fullWidth onClose={onClose}>
      <DialogTitle>請選擇區域</DialogTitle>
      <DialogContent>
        <List className="flex-auto overflow-y-auto" subheader={<li />}>
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
                            center: territory.center,
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
    </Dialog>
  );
};

export default TerritorySelect;
