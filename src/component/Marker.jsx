import { AdvancedMarker } from "@vis.gl/react-google-maps";

const Marker = ({ position, icon }) => <AdvancedMarker position={position}>{icon} </AdvancedMarker>;
export default Marker;
