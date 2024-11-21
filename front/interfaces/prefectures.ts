import type { FeatureCollection, Geometry } from "geojson";

export type PrefectureProperty = {
  pref: number;
  name: string;
};

export type Prefecture = FeatureCollection<Geometry, PrefectureProperty>;
