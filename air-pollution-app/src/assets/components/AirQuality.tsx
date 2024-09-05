interface Props {
  airData: any;
}

function AirQuality({ airData }: Props) {
  const MILLISECONDS = 1000;
  let pm2_5 = airData.sensor["stats"]["pm2.5_24hour"];
  let name = airData.sensor["name"];
  let timeStamp = airData["time_stamp"] * MILLISECONDS;

  console.log(pm2_5);

  let queriedTime = new Date(timeStamp).toLocaleTimeString();

  return (
    <>
      <h1>Air Quality</h1>
      <p>PM2.5: {pm2_5}</p>
      <p>Location: {name}</p>
      <p>Time: {queriedTime}</p>
    </>
  );
}

export default AirQuality;
