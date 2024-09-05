interface Props {
  airData: any;
}

function AirQuality({ airData }: Props) {
  const MILLISECONDS = 1000;

  let name = airData.name;
  let pm2_5 = airData.sensorData["pm2.5_24hr"];

  let timeStamp = airData["time_read"] * MILLISECONDS;

  console.log(pm2_5);

  let queriedTime = new Date(timeStamp).toLocaleTimeString();

  return (
    <>
      <h1>Air Quality</h1>
      <p>Location: {name}</p>
      <p>Time: {queriedTime}</p>
      <p>PM2.5: {pm2_5}</p>
    </>
  );
}

export default AirQuality;
