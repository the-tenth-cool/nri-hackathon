<template>
  <DrawCardButton
    @button-click="buttonClick"
  ></DrawCardButton>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public

const buttonClick = async () => {
  await $fetch<AvailableCard[]>(`${apiOrigin}/draw_cards`);
}
</script>
