const basePath = "/api";

export function getAirQuality(
  sensorId: number,
  fields: string
): Promise<Response> {
  return fetch(`${basePath}`, {
    headers: {
      sensorId: sensorId.toString(),
      fields: fields.toString(),
    },
  });
}

export function encodeURL(url: string): string {
  return encodeURIComponent(url);
}
