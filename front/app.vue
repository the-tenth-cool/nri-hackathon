<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<script setup lang="ts">
useHead({
  meta: [
    {
      charset: "utf-8",
    },
  ],
  title: "NRIハッカソン",
});
</script>
