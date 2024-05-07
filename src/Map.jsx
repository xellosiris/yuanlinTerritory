import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { SHA256 } from "crypto-js";
import { useCallback, useEffect, useState } from "react";
import Menu from "./Menu";
import Markers from "./component/Markers";
import Territory from "./component/Territory";
import { expandCoordinates, getPublishers } from "./util/util";
const Map = ({ data }) => {
  const [publishers, setPublishers] = useState([]);
  const [showPubs, setShowPubs] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordDialog, setPasswordDialog] = useState(false);
  const [territories, setTerritories] = useState([]);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [cameraProps, setCameraProps] = useState({ center: { lat: 23.948507, lng: 120.45138 }, zoom: 12 });

  const handleCameraChange = useCallback((e) => setCameraProps(e.detail), []);

  const onSelectedTerritory = (territory) => {
    setSelectedTerritory(territory);
    setCameraProps({ center: territory?.center, zoom: 17 });
  };

  const togglePubsShow = () => {
    if (showPubs) {
      setShowPubs(false);
    } else {
      setPasswordDialog(true);
    }
  };
  const onPasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const onPasswordVerify = (password, setPasswordDialog) => {
    if (SHA256(password).toString() === "c822b1ea32dd173f7846c017677c3f1d83b3e5349dc16031ee251351d3d13ebc") {
      setPasswordDialog(false);
      setShowPubs(true);
    }
  };

  useEffect(() => {
    if (data) {
      setTerritories(expandCoordinates(data[0]));
      setPublishers(getPublishers(data[1]));
    }
  }, [data]);

  useEffect(() => {
    if (!selectedTerritory) {
      setCameraProps({ center: { lat: 23.948507, lng: 120.45138 }, zoom: 12 });
    }
  }, [selectedTerritory]);

  return (
    <GoogleMap
      className="relative h-screen w-full"
      id="TerritoryMap"
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      {...cameraProps}
      onCameraChanged={handleCameraChange}
      mapId="TerritoryMap"
    >
      <Menu
        territories={territories}
        selectedTerritory={selectedTerritory}
        onSelectedTerritory={onSelectedTerritory}
        togglePubsShow={togglePubsShow}
        showPubs={showPubs}
      />
      <Markers data={publishers} active={showPubs} />
      {!selectedTerritory && territories.map((territory) => <Territory key={territory.name} territory={territory} />)}
      {!!selectedTerritory && (
        <Territory territory={territories?.find(({ name }) => name === selectedTerritory.name)} showBgColor={false} />
      )}
      {passwordDialog && (
        <Dialog
          open
          PaperProps={{
            component: "form",
            onSubmit: (e) => {
              e.preventDefault();
              onPasswordVerify(password, setPasswordDialog);
              setPassword("");
            },
          }}
          onClose={() => setPasswordDialog(false)}
        >
          <DialogTitle>請輸入密碼</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              type="password"
              label="密碼"
              value={password}
              onChange={onPasswordChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">送出</Button>
          </DialogActions>
        </Dialog>
      )}
    </GoogleMap>
  );
};

export default Map;
