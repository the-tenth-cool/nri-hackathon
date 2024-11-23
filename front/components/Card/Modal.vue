<template>
  <div 
    class="fixed inset-0 z-[1100] bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
    @click="closeModal"
  >
    <div
      class="bg-white w-4/5 h-5/6 p-6 rounded-lg shadow-xl opacity-100 scale-100 flex flex-col justify-between animate-fade-in"
      @click.stop
    >
      <div class="grid grid-cols-2 w-full h-full">
        <div class="flex justify-center items-center">
          <div
            class="bg-white h-[34rem] aspect-[3/4] z-[1000] flex-none rounded shadow-xl border-8 animate-scale-in-hor-center"
            :class="[frameColor]"
          >
            <div
              class="h-full w-full flex flex-col justify-between p-3"
            >
              <div class="h-2/3 w-full content-center">
                <img
                  :src="getImage(selectedCard)"
                  alt="カード画像"
                  class="object-cover hover:object-scale-down w-full h-full justify-self-center border-4 "
                  :class="[frameColor]"
                />
              </div>
              <div class="flex-grow grid grid-cols-1 content-start">
                <p class="text-center font-bold mt-3">No. {{ selectedCard.card_id }}</p>
                <p class="text-center text-3xl font-bold mt-1">{{ selectedCard.prefecture_name }}</p>
                <p class="text-center text-xl font-semibold text-gray-500">{{ selectedCard.region_name }}</p>
                <p class="text-center text-2xl font-bold mt-1">{{ selectedCard.food_genre_name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="content-center">
          <p class="text-center text-2xl">{{ selectedCard.type === "available" ? selectedCard.description : selectedCard.user_description }}</p>
          <div v-if="selectedCard.type === 'available'" class="flex justify-center">
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
}
const { selectedCard } = defineProps<Props>();
const emit = defineEmits(["close"]);
const { getImage } = useImage();
const router = useRouter();
const frameColor = useColor().getFrameColorByCard(selectedCard);

const closeModal = () => {
  emit("close");
}

const registerCard = () => {
  router.push(`/registration/${selectedCard.card_id}`);
}
</script>
