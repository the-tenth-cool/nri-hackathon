<template>
  <p>CCL</p>
  <div v-if="status === 'idle' || status === 'pending'">
    ...wait
  </div>
  <div v-else>
    <CollectionCard
      v-for="card in data"
      :card="card"
    ></CollectionCard>
  </div>
  <p>CCL</p>
</template>

<script setup lang="ts">
import type { CollectionCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public
const { data, status } = await useFetch<CollectionCard[]>(`${apiOrigin}/cards`);
</script>
