import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

const PinPublisher = ({ address, members }) => {
  const { group, coordinates } = members[0];
  const [infoWindowShown, setInfowindowShown] = useState(false);
  const toggleInfoWindow = () => setInfowindowShown((previousState) => !previousState);
  const closeInfoWindow = () => setInfowindowShown(false);
  const bgColor = {
    員林: "#364583",
    大村: "#2d681c",
    溪湖: "#ab4a3e",
    埔心: "#d8941c",
    二林: "#88ab10",
    芳苑: "#364583",
    大城: "#f3d744",
  };
  const getLocation = (address) => {
    if (address.includes("員林")) {
      return "員林";
    }
    if (address.includes("大村")) {
      return "大村";
    }
    if (address.includes("溪湖")) {
      return "溪湖";
    }
    if (address.includes("埔心")) {
      return "埔心";
    }
    if (address.includes("二林")) {
      return "二林";
    }
    if (address.includes("芳苑")) {
      return "芳苑";
    }
    if (address.includes("大城")) {
      return "大城";
    }
  };
  return (
    <AdvancedMarker position={coordinates} onClick={toggleInfoWindow}>
      <Pin background={bgColor[getLocation(address)]} glyphColor={"#fff"} />
      {infoWindowShown && (
        <Dialog open onClose={closeInfoWindow}>
          <DialogTitle>傳道員資訊</DialogTitle>
          <DialogContent className="flex flex-col gap-2">
            <p>地址：{address}</p>
            <p>所屬小組：{group}</p>
            <p>居住成員：{members.map(({ name }) => name).join("、")}</p>
          </DialogContent>
        </Dialog>
      )}
    </AdvancedMarker>
  );
};

export default PinPublisher;
