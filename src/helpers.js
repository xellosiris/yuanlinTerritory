import polylabel from "polylabel";
export const getCenter = (coordinates) => {
  const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
  return {
    lat: p[1],
    lng: p[0],
  };
};
