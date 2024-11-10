<template>
  <Map></Map>
  <Card
    v-for="card in collectionCards"
    :card="card"
  ></Card>
</template>

<script setup lang="ts">
  import type { Card } from '~/interfaces/card';
  const collectionCards = ref<Card[]>([]);
  // const availableCards = ref<Card[]>([]);
  onMounted(async () => {
    // await useFetch<Card[]>("http://localhost:8000/cards");
    // const c = await useFetch<Card[]>("http://localhost:8000/cards");
    // const a = await useFetch<Card[]>("http://localhost:8000/available_cards");
    // const { data, error } = await useFetch<Card[]>("http://localhost:8000/available_cards");
    const data = await $fetch<Card[]>("http://localhost:8000/available_cards");
    // collectionCards.value = c;
    // availableCards.value = a;
    // if (error) {
    //   console.log("error");
    //   console.log(error);
    // }
    console.log(data)
    // console.log(a.data.value);
    // console.log(c.data);
  });
</script>
