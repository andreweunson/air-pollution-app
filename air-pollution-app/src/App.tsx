import { useEffect, useState } from "react";
import "./App.css";
import AirQuality from "./assets/components/AirQuality";

function App() {
  const [airData, setAirData] = useState({ sensor: { "pm2.5": 0 } });
  const [airQuality, setAirQuality] = useState(-1);
  const myRequest = new Request(
    "https://api.purpleair.com/v1/sensors/175509?fields=name%2Cpm2.5",
    {
      headers: {
        "X-API-Key": "your api key here",
      },
    }
  );

  useEffect(() => {
    if (airData.sensor["pm2.5"] !== 0) {
      return;
    }
    fetch(myRequest)
      .then((response) => response.json())
      .then((airData) => setAirData(airData));
  }, [airData, myRequest, setAirData]);

  setAirQuality(airData.sensor["pm2.5"]);
  return (
    <div>
      <AirQuality />
    </div>
  );
}

export default App;
