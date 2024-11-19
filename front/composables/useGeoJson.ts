import { type GeoJSON } from "geojson";
import json from "@/public/prefectures.geojson.json";

export const useGeoJson = () => {
  const getPrefectures = (): GeoJSON => {
    return json as GeoJSON;
  }

  return {
    getPrefectures,
  }
}
