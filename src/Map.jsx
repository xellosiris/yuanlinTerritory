import { Map as GoogleMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useState } from "react";
import Menu from "./Menu";
import Territory from "./component/Territory";
import { expandCoordinates } from "./util/util";
const MapInstance = ({ data }) => {
	const [territories, setTerritories] = useState([]);
	const [selectedTerritory, setSelectedTerritory] = useState(null);
	const [cameraProps, setCameraProps] = useState({
		center: { lat: 23.948507, lng: 120.45138 },
		zoom: 12,
	});

	const handleCameraChange = useCallback((e) => setCameraProps(e.detail), []);

	const onSelectedTerritory = (territory) => {
		setSelectedTerritory(territory);
		setCameraProps({ center: territory?.center, zoom: 17 });
	};

	useEffect(() => {
		if (data) {
			setTerritories(expandCoordinates(data[0]));
		}
	}, [data]);

	useEffect(() => {
		if (!selectedTerritory) {
			setCameraProps({ center: { lat: 23.948507, lng: 120.45138 }, zoom: 12 });
		}
	}, [selectedTerritory]);

	return (
		<GoogleMap
			className="relative w-full h-screen"
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
			/>
			{!selectedTerritory &&
				territories.map((territory) => (
					<Territory key={territory.name} territory={territory} />
				))}
			{!!selectedTerritory && (
				<Territory
					territory={territories?.find(
						({ name }) => name === selectedTerritory.name,
					)}
					showBgColor={false}
				/>
			)}
		</GoogleMap>
	);
};

export default MapInstance;
