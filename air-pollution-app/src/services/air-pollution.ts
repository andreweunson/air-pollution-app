const basePath = "https://api.purpleair.com/v1/sensors";

export function getAirQuality(sensorId: number, fields: string, apiKey: string): Promise<Response> {
  return fetch(`${basePath}/${sensorId}?fields=${fields}`, {
    headers: {
      "X-API-Key": `${apiKey}`,
    },
  })
}

export function encodeURL(url: string): string {
  return encodeURIComponent(url);
}