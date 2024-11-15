<template>
  <CardSmall
    v-for="card in data"
    :card="card"
    frame-color="gray-yellow-200"
  >
  </CardSmall>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public
const emit = defineEmits<{
  (e: "countNumberOfAvailableCard", count: number): void,
}>()

const { data } = await useFetch<AvailableCard[]>(`${apiOrigin}/available_cards`);
emit("countNumberOfAvailableCard", data.value!.length)
</script>
