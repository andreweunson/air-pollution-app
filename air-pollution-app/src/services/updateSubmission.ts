import { getAirQuality } from "./air-pollution";

export function updateSubmission(sensor: number, fields: string) {
  getAirQuality(sensor, fields);
}
