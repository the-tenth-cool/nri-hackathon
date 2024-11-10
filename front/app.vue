<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
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
