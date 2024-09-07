const express = require("express");
const app = express();
require("dotenv").config();

let cachedData = {};
let lastFetchTime = 0;

app.get("/api", async (req, res) => {
  // If the last fetch time is within refresh threshold then return the data we already have
  let currentTime = Date.now();
  console.log(`\nCurrent time: ${currentTime}`);
  console.log(`Last fetch time: ${lastFetchTime}`);
  console.log(`Time elapsed: ${currentTime - lastFetchTime}`);

  // If cache is not stale, return cached data
  if (currentTime - lastFetchTime < process.env.REFRESH_INTERVAL) {
    console.log("Cache is fresh, returning cached data");
    res.send(cachedData);
    return;
  }
  console.log("Cache is stale, fetching new data");

  // Set options for what data we want to fetch. If not parsable, use the default
  let sensorId = req.get("sensorId") || process.env.DEFAULT_SENSOR_ID;
  let options = req.get("fields") || process.env.DEFAULT_SENSOR_FIELDS;
  let encodedFields = encodeURIComponent(options);
  console.log(
    `Fetching data with headers of:\n\tsensorId: ${sensorId},\n\tfields: ${encodedFields}`
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
        // Returning custom JSON object with relevant data
        fetchedData = {
          name: data.sensor.name,
          time_read: data.time_stamp,
          sensorData: {
            sensor_index: data.sensor.sensor_index,
            "pm2.5": data.sensor.stats["pm2.5"],
            "pm2.5_24hr": data.sensor.stats["pm2.5_24hour"],
          },
        };
        lastFetchTime = Date.now(); // Update the last fetch time
        cachedData = fetchedData; // Cache the fetched data since cache is stale
        res.send(fetchedData);
      });
    })
    .catch((error) => console.error(error));
});

app.listen(process.env.DEFAULT_PORT, () => {
  console.log(`Server is running on port ${process.env.DEFAULT_PORT}`);
});
