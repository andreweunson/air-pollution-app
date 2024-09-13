import { useEffect, useState } from "react";
import "./App.css";
import AirQuality from "./assets/components/AirQuality";
import { getAirQuality } from "./services/air-pollution";

function App() {
  const [airData, setAirData] = useState({
    api_version: "",
    time_stamp: 0,
    data_time_stamp: 0,
    sensor: {
      sensor_index: 0,
      name: "",
      "pm2.5": 0,
      stats: { "pm2.5": 0, "pm2.5_24hour": 0, time_stamp: 0 },
    },
  });

  const [refresh, setRefresh] = useState(false);
  const SENSOR_ID = 175509;
  const FIELDS = "name,pm2.5_24hour";

  // Refreshes the data every 5 minutes
  setInterval(() => {
    setRefresh(!refresh);
  }, 5 * 60 * 1000);

  useEffect(() => {
    getAirQuality(SENSOR_ID, FIELDS)
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
