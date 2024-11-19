<template>
  <div class="grid grid-cols-2 gap-4">
    <div class="bg-gray-100 p-4">
      <Map></Map>
    </div>
    <div class="bg-green-100 p-6 flex flex-wrap gap-2 justify-center">
      <ListOfCollectionCard></ListOfCollectionCard>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-4">
    <ListOfAvailableCard></ListOfAvailableCard>
  </div>
</template>

<script setup lang="ts">
</script>
