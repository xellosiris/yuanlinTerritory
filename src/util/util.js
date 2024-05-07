import polylabel from "polylabel";

export const expandCoordinates = (sheetData) => {
  if (!sheetData) return [];
  if (!sheetData) return [];
  return sheetData.data.map((t) => ({
    ...t,
    coordinates: JSON.parse(t.coordinates),
    center: getCenter(JSON.parse(t.coordinates)),
  }));
};

export const getPublishers = (sheetData) => {
  if (!sheetData) return [];
  const publishersData = sheetData?.data.map((publisher) => ({
    ...publisher,
    coordinates: JSON.parse(publisher.coordinates),
  }));

  const publishersGroupBy = Object.groupBy(publishersData, ({ address }) => address);
  const publishers = Object.entries(publishersGroupBy).map(([address, value]) => ({
    address,
    coordinates: value[0].coordinates,
    group: value[0].group,
    members: value.map(({ name }) => name).join("、"),
  }));
  return publishers;
};

export const getCenter = (coordinates) => {
  const p = polylabel([coordinates.map(({ lat, lng }) => [lng, lat, 0.0])]);
  return {
    lat: p[1],
    lng: p[0],
  };
};
