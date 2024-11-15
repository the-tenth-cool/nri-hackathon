<template>
  <NuxtLink
    class="bg-white w-24 h-32 rounded shadow-lg border-4 transform duration-75 scale-100 hover:scale-105 hover:-translate-y-3"
    :class="[frameColor]"
    :to="url"
  >
    <div
      class="p-1"
    >
      <img
        src="/img/noimage.png"
        alt="カード画像"
        class="border-2"
        :class="[frameColor]"
      />
    </div>
    <p class="text-center">{{ card.prefecture_name }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
import { type Card } from '~/interfaces/card';
const { cssClassOfFrameColor } = useCollectionCard()
interface Props {
  card: Card,
  frameColor: string,
}
const { card, frameColor } = defineProps<Props>();
const url = frameColor === cssClassOfFrameColor ? `/collection-cards/${card.card_id}` : `/available-cards/${card.card_id}`
</script>
