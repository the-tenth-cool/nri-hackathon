import type { FeatureCollection } from "geojson";
import json from "@/public/prefectures.geojson.json";
import type { PrefectureProperty } from "~/interfaces/prefectures";

export const useGeoJson = () => {
  const getColor = (
    prefecture: PrefectureProperty,
    acPrefIds: Set<number>,
    ccPrefIds: Set<number>,
  ): string => {
    if (ccPrefIds.has(prefecture.pref)) {
      return "#FCD34D";
    } else if (acPrefIds.has(prefecture.pref)) {
      return "#00ffff";
    } else {
      return "#7fff00";
    }
  }

  const getPrefectures = (): FeatureCollection => {
    return json as FeatureCollection;
  }

  return {
    getColor,
    getPrefectures,
  }
}
