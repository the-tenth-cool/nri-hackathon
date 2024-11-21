<template>
  <div style="height: 100%;">
    <div v-if="!mapAvailable">
      地図を読み込んでいます・・・
    </div>
    <LMap
      style="height: 100%;"
      :zoom="5"
      :center="[38, 136]"
      :use-global-leaflet="false"
    >
      <LGeoJson
        :geojson="geojson"
        :options-style="geoStyler"
      />
    </LMap>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { PathOptions } from "leaflet";
import type { AvailableCard, CollectionCard } from "~/interfaces/card";
import type { PrefectureProperty } from "~/interfaces/prefectures";

interface Props {
  availableCards: AvailableCard[];
  collectionCards: CollectionCard[];
}
const { availableCards, collectionCards } = defineProps<Props>();
const acPrefIds = new Set(availableCards.map((ac) => Number(ac.prefecture_id)));
const ccPrefIds = new Set(collectionCards.map((cc) => Number(cc.prefecture_id)));

const mapAvailable = ref(false);
const geojson = ref<FeatureCollection>();
onMounted(async () => {
  geojson.value = useGeoJson().getPrefectures();
  mapAvailable.value = true;
})

const geoStyler = (feature: Feature<Geometry, PrefectureProperty> | undefined): PathOptions => {
  if (!feature) {
    return {}
  }
  return {
    fillColor: useGeoJson().getColor(feature.properties, acPrefIds, ccPrefIds),
    weight: 0.4,
    color: 'black',
    fillOpacity: 1
  }
}
</script>

<style>
.leaflet-bottom {
  z-index: 0;
}
</style>
