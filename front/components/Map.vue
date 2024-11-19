<template>
  <div style="height: 70svh;">
    <div v-if="!mapAvailable">
      地図を読み込んでいます・・・
    </div>
    <LMap
      style="height: 100%"
      :zoom="5"
      :center="[38, 136]"
      :use-global-leaflet="false"
    >
      <LGeoJson
        :geojson="geojson"
      />
    </LMap>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { type GeoJSON } from "geojson";

const mapAvailable = ref(false);
const geojson = ref<GeoJSON>();
onMounted(async () => {
  geojson.value = useGeoJson().getPrefectures();
  mapAvailable.value = true;
})

</script>
