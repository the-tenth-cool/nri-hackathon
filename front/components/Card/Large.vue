<template>
  <div
    class="card"
    :class="[frameColor]"
  >
    <div
      class="p-2"
    >
      <img
        src="/img/noimage.png"
        alt="カード画像"
        class="border-4"
        :class="[frameColor]"
      />
    </div>
    <p class="text-center">{{ card.card_id }}</p>
    <p class="text-center">{{ card.prefecture_name }}</p>
    <p class="text-center">{{ card.region_name }}</p>
    <p class="text-center">{{ card.food_genre_name }}</p>
    <p class="text-center">{{ card.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Card } from '~/interfaces/card';
interface Props {
  card: Card,
  frameColor: string,
}
const { card } = defineProps<Props>();
</script>

<style scoped>
.card {
  @apply bg-white rounded shadow-lg border-8 transform duration-75 scale-100 hover:scale-105 hover:-translate-y-3;
  height: 50svh;
  width: 40svh;
  /* background-color: v-bind("card.card_color"); */
}
</style>
