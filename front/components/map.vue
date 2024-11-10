<template>
  <iframe 
    :src="openStreetMapUrl()" 
    width="600" 
    height="450" 
    style="border:0;" 
    loading="lazy">
  </iframe>
</template>

<script setup lang="ts">
  const openStreetMapUrl = () => {
    let latitude = 35.6894  // 緯度
    let longitude = 139.6917  // 経度
    let offset = 0.01 // 緯度経度のオフセット

    return "https://www.openstreetmap.org/export/embed.html"
      + "?bbox="
      + (longitude - offset) // min Longitude (left)
      + "%2C"
      + (latitude - offset)  // min Latitude (bottom)
      + "%2C"
      + (longitude + offset) //  max Longitude (right)
      + "%2C"
      + (latitude + offset)  // max Latitude (top)
  }
</script>
