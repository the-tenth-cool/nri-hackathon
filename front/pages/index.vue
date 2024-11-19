<template>
  <div class="h-full flex flex-col">
    <div class="h-full grid grid-cols-2 gap-4">
      <div class="bg-gray-100 p-4">
        <Map></Map>
      </div>
      <div class="bg-green-100 p-6 flex flex-wrap gap-2 justify-center">
        <ListOfCollectionCard></ListOfCollectionCard>
      </div>
    </div>
    <div class="bg-gray-300 gap-2 flex flex-row justify-center items-end h-1/5 mt-4">
      <CardSmall
        v-for="card in cards"
        :card="card"
        :frame-color="cssClassOfFrameColor"
      >
      </CardSmall>
    </div>
  </div>
</template>

<script setup lang="ts">
const { findAll, cssClassOfFrameColor } = useAvailableCard();
const cards = await findAll();
</script>
