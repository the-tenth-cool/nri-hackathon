<template>
  <Map></Map>
  <Card
    v-for="card in collectionCards"
    :card="card"
  ></Card>
  <Card
    v-for="card in availableCards"
    :card="card"
  ></Card>
</template>

<script setup lang="ts">
  import type { Card } from '~/interfaces/card';
  const collectionCards = ref<Card[]>([]);
  const availableCards = ref<Card[]>([]);
  onMounted(async () => {
    const c = await $fetch<Card[]>("/api/cards");
    const a = await $fetch<Card[]>("/api/cards");
    availableCards.value = c;
    collectionCards.value = a;
  });
</script>
