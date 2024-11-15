<template>
  <CardSmall
    v-for="card in data"
    :card="card"
    frame-color="border-yellow-200"
  >
  </CardSmall>
</template>

<script setup lang="ts">
import type { CollectionCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public
const { data } = await useFetch<CollectionCard[]>(`${apiOrigin}/cards`);
</script>
