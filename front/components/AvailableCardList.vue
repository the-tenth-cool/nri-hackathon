<template>
  <p>ACL</p>
  <div v-if="status === 'idle' || status === 'pending'">
    ...wait
  </div>
  <div v-else>
    <AvailableCard
      v-for="card in data"
      :card="card"
    ></AvailableCard>
  </div>
  <p>ACL</p>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public
const { data, status } = await useFetch<AvailableCard[]>(`${apiOrigin}/available_cards`);
</script>
