const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 3000;

app.get("/api", async (req, res) => {
  // Set options for what data we want to fetch, if not parsable then use the default
  let sensorId = req.get("sensorId") || process.env.DEFAULT_SENSOR_ID;
  let options = req.get("fields") || process.env.DEFAULT_SENSOR_FIELDS;
  let encodedFields = encodeURIComponent(options);

  // Debug log
  console.log(
    `Fetching data with headers of:\nsensorId: ${sensorId},\nfields: ${encodedFields}\n`
  );

  // Fetch the data from the PurpleAir API
  fetch(
    `https://api.purpleair.com/v1/sensors/${sensorId}?fields=${encodedFields}`,
    {
      headers: {
        "X-API-Key": process.env.REACT_APP_API_KEY,
      },
    }
  )
    .then((response) => {
      response.json().then((data) => {
        // Instead of displaying the data with something like a res.send(data) we can instead make our
        // own json and send that so I can guarantee the body is always the same
        fetchedData = {
          name: data.sensor.name,
          time_read: data.time_stamp,
          sensorData: {
            sensor_index: data.sensor.sensor_index,
            "pm2.5": data.sensor.stats["pm2.5"],
            "pm2.5_24hr": data.sensor.stats["pm2.5_24hour"],
          },
        };
        res.send(fetchedData);
      });
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
