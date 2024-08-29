import { useEffect, useState } from "react";
import "./App.css";
import AirQuality from "./assets/components/AirQuality";
import { getAirQuality } from "./services/air-pollution";

function App() {
  const [airData, setAirData] = useState({ sensor: { "pm2.5": 0 } });
  const [refresh, setRefresh] = useState(false);

  // Refreshes the data every 5 minutes
  setInterval(() => {
    setRefresh(!refresh);
  }, 30000);

  useEffect(() => {
    getAirQuality(175509, "name%2Cpm2.5", "YOUR_API_KEY")
      .then((response: Response) => response.json())
      .then((airData: any) => setAirData(airData));
  }, [refresh]);

  return (
    <div>
      <AirQuality airData={airData} />
    </div>
  );
}

export default App;
