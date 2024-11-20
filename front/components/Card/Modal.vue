<template>
  <div 
    class="fixed inset-0 z-[1000] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    @click="closeModal"
  >
    <div
      class="bg-white p-5 rounded-lg shadow-xl opacity-100 scale-100"
      @click.stop
    >
      <h2 class="text-xl font-bold mb-4">{{ selectedCard.prefecture_name }}</h2>
      <p>カードの詳細情報をここに表示</p>
      <button @click="closeModal" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        閉じる
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Card } from '~/interfaces/card';

interface Props {
  selectedCard: Card;
}
defineProps<Props>();
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
}
</script>
