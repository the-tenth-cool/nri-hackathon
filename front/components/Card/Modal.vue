<template>
  <div 
    class="fixed inset-0 z-[1100] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    @click="closeModal"
  >
    <div
      class="bg-white w-3/5 h-4/5 p-5 rounded-lg shadow-xl opacity-100 scale-100 flex flex-col justify-between animate-fade-in"
      @click.stop
    >
      <div class="grid grid-cols-2 gap-4 w-full h-full">
        <div class="flex justify-center items-center">
          <div
            class="bg-white h-5/6 aspect-[3/4] z-[1000] flex-none rounded shadow-xl border-4 animate-scale-in-hor-center"
          >
            <div
              class="h-full w-full flex flex-col justify-end p-2"
            >
              <div class="border-2 h-full w-full flex-grow content-center">
                <img
                  src="/img/noimage.png"
                  alt="カード画像"
                  class="object-contain max-w-48 max-h-48 justify-self-center"
                  :class="[frameColor]"
                />
              </div>
              <p class="text-center text-base font-semibold mt-1">{{ selectedCard.prefecture_name }}</p>
              <p class="text-center text-lg font-bold">{{ selectedCard.food_genre_name }}</p>
            </div>
          </div>
        </div>
        <div class="content-center">
          <p class="text-center">No. {{ selectedCard.card_id }}</p>
          <p class="text-center">{{ selectedCard.description }}</p>
          <div class="flex justify-center">
            <button 
              @click="registerCard" 
              class="mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out"
            >
              カードを登録
            </button>
          </div>
        </div>
      </div>
      <button @click="closeModal" class="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Card } from '~/interfaces/card';

interface Props {
  selectedCard: Card;
  frameColor: string,
}
const { selectedCard } = defineProps<Props>();
const emit = defineEmits(["close"]);
const router = useRouter();

const closeModal = () => {
  emit("close");
}

const registerCard = () => {
  router.push(`/registration/${selectedCard.card_id}`);
}
</script>
