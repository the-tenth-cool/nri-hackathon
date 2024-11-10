<template>
  <div class="card" :style="{ backgroundColor: card.card_color }">
    <h2 class="card-title">{{ card.prefecture_name }} - {{ card.food_genre_name }}</h2>
    <p class="card-region">{{ card.region_name }}</p>
    <p class="card-description">{{ card.description }}</p>
  </div>
</template>

<script setup lang="ts">
import type { CollectionCard } from '~/interfaces/card';
interface Props {
  card: CollectionCard;
}
const { card } = defineProps<Props>();
</script>

<style scoped>
.card {
  width: 300px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
}

.card-title {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.card-region {
  font-size: 1em;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
}

.card-description {
  font-size: 1em;
}
</style>
