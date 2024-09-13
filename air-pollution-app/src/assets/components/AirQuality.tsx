interface Props {
  airData: any;
}

function AirQuality({ airData }: Props) {
  const MILLISECONDS = 1000;

  let sensor = airData.sensor;
  let name = sensor.name;
  try {
    let keys = new Array(Object.keys(airData.sensor.stats).length);
    for (let i = 0; i < keys.length; i++) {
      keys[i] = Object.keys(airData)[i];
    }
    let values = new Array(Object.values(airData.sensor.stats).length);
    for (let i = 0; i < values.length; i++) {
      values[i] = Object.values(airData)[i];
    }
  } catch (error) {
    console.log(error);
    return <h1>There was an error</h1>;
  }

  try {
    let pm2_5 = sensor.stats["pm2.5"];
    let timeStamp = airData["time_stamp"] * MILLISECONDS;
    let queriedTime = new Date(timeStamp).toLocaleTimeString();
    return (
      <>
        <h1>Air Quality</h1>
        <p>Location: {name}</p>
        <p>Time: {queriedTime}</p>
        <p>PM2.5: {pm2_5}</p>
      </>
    );
  } catch (error) {
    console.log(error);
    return <h1>There was an error</h1>;
  }
}

export default AirQuality;
