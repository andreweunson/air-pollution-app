const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 3000;

app.get("/api", async (req, res) => {
  let sensorId = req.get("sensorId");
  let encodedFields = encodeURIComponent(req.get("fields"));
  console.log(`sensorId: ${sensorId}\nfields: ${encodedFields}`);

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
        res.send(data);
      });
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
