export const LOCATIONS_BACKGROUNDS = {
  員林: "#364583",
  大村: "#2d681c",
  溪湖: "#ab4a3e",
  埔心: "#d8941c",
  二林: "#88ab10",
  芳苑: "#364583",
  大城: "#f3d744",
};

export const getLocationsBackground = (address) => {
  if (address.includes("員林")) {
    return LOCATIONS_BACKGROUNDS.員林;
  }
  if (address.includes("大村")) {
    return LOCATIONS_BACKGROUNDS.大村;
  }
  if (address.includes("溪湖")) {
    return LOCATIONS_BACKGROUNDS.溪湖;
  }
  if (address.includes("埔心")) {
    return LOCATIONS_BACKGROUNDS.埔心;
  }
  if (address.includes("二林")) {
    return LOCATIONS_BACKGROUNDS.二林;
  }
  if (address.includes("芳苑")) {
    return LOCATIONS_BACKGROUNDS.芳苑;
  }
  if (address.includes("大城")) {
    return LOCATIONS_BACKGROUNDS.大城;
  }
};
