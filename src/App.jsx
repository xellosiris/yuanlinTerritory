import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./Map";
function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      <Map />
    </APIProvider>
  );
}

export default App;
