<template>
  <DrawCardButton
    @button-click="buttonClick"
  ></DrawCardButton>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public
const toast = useToast()

const buttonClick = async () => {
  await $fetch<AvailableCard[]>(`${apiOrigin}/draw_cards`);
  toast.add({
    title: "カードを引きました！"
  })
}
</script>
