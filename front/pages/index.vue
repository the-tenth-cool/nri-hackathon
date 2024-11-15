<template>
  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2 bg-gray-100 p-4">
      <Map></Map>
    </div>
    <div class="bg-green-100 p-6 flex flex-wrap gap-2 justify-center">
      <CollectionCardList></CollectionCardList>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-4">
    <AvailableCardList
      @count-number-of-available-card="setNum"
    ></AvailableCardList>
  </div>
  <p>{{ num }}</p>
</template>

<script setup lang="ts">
const num = ref<number>(0);
const setNum = (count: number) => {
  num.value = count;
}
</script>
