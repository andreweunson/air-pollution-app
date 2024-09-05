import { useEffect, useState } from "react";
import "./App.css";
import AirQuality from "./assets/components/AirQuality";
import { getAirQuality } from "./services/air-pollution";

function App() {
  const [airData, setAirData] = useState({ sensor: { stats: { "pm2.5": 0 } } });
  const [refresh, setRefresh] = useState(false);

  // Refreshes the data every 5 minutes
  setInterval(() => {
    setRefresh(!refresh);
  }, 300000);

  useEffect(() => {
    getAirQuality(175509, "name,pm2.5_24hour")
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
