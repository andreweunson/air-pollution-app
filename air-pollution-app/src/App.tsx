import { useEffect, useState } from "react";
import "./App.css";
import AirQuality from "./assets/components/AirQuality";
import { getAirQuality } from "./services/air-pollution";

function App() {
  const [airData, setAirData] = useState({
    name: "",
    time_read: 0,
    sensorData: {
      "pm2.5": -1,
      "pm2.5_24hour": -1,
    },
  });
  const [refresh, setRefresh] = useState(false);
  const sensorIdRequested = 175509;
  const fieldsRequested = "name,pm2.5_24hour";

  // Refreshes the data every 5 minutes
  setInterval(() => {
    setRefresh(!refresh);
  }, 300000);

  useEffect(() => {
    getAirQuality(sensorIdRequested, fieldsRequested)
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
