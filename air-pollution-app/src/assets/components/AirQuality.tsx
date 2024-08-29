interface Props {
  airData: any;
}

function AirQuality({ airData }: Props) {
  let value = airData.sensor["pm2.5"];

  return <div>{value ? <h1>{value}</h1> : <h1>Air Quality</h1>}</div>;
}

export default AirQuality;
