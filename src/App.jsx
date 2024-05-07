import { APIProvider } from "@vis.gl/react-google-maps";
import Map from "./Map";
import useGoogleSheets from "use-google-sheets";

function App() {
  const { data, loading, error } = useGoogleSheets({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    sheetId: import.meta.env.VITE_SHEET_ID,
    sheetsOptions: [{ id: "區域彙整", headerRowIndex: 1 }, { id: "傳道員地址" }],
  });
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {!!data && <Map data={data} />}
    </APIProvider>
  );
}

export default App;
