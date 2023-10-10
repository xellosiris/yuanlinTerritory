import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./Map";
function App() {
  const { isLoaded } = useJsApiLoader({
    id: "yuanlinterritory-map",
    language: "zh-TW",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  });
  if (!isLoaded) return <div className="text-red">loading</div>;

  return <Map />;
}

export default App;
