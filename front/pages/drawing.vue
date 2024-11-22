<template>
  <div class="flex flex-col items-center justify-center">
    <div class="grid grid-cols-3 gap-4 mb-8">
      <div v-for="(card, index) in displayedCards" :key="index" class="flex justify-center items-center">
        <div
          class="bg-white h-72 aspect-[3/4] z-[1000] flex-none rounded shadow-xl border-4 animate-scale-in-hor-center"
          :class="[frameColor]"
        >
          <div class="h-full w-full flex flex-col justify-end p-2">
            <div class="border-2 h-full w-full flex-grow content-center"
                :class="[frameColor]"
            >
              <img
                :src="getImage(card)"
                alt="カード画像"
                class="object-cover min-w-96 h-full justify-self-center"
              />
            </div>
            <p class="text-center text-base font-semibold mt-1">{{ card.prefecture_name }}</p>
            <p class="text-center text-lg font-bold">{{ card.food_genre_name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8" v-if="!cardsDrawn">
      <button
        @click="buttonClick"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out text-xl"
        :class="{ 'scale-110': isClicked, 'opacity-0 transition-opacity duration-500': fadeOutButton }"
      >
        カードをひく
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';

const router = useRouter();
const { apiOrigin } = useRuntimeConfig().public
const toast = useToast()
const drawedCard = ref<AvailableCard[]>([])
const displayedCards = ref<AvailableCard[]>([])
const isClicked = ref(false)
const cardsDrawn = ref(false)
const fadeOutButton = ref(false)

const frameColor = useColor().getFrameColorByType("available");

const { getImage } = useImage();

const buttonClick = async () => {
  isClicked.value = true;
  fadeOutButton.value = true;
  
  setTimeout(() => {
    cardsDrawn.value = true;
  }, 500);

  const cards = await $fetch<AvailableCard[]>(`${apiOrigin}/draw_cards`);
  drawedCard.value = cards;
  displayedCards.value = [];
  showCardsWithDelay();
  console.log(cards);
  toast.add({
    title: "カードを引きました！",
    description: "トップページに戻ります。",
    timeout: 5000,
    callback: () => {
      router.push('/');
    }
  })
}

const showCardsWithDelay = () => {
  drawedCard.value.forEach((card, index) => {
    setTimeout(() => {
      displayedCards.value.push(card);
    }, index * 500);
  });
}
</script>

<style scoped>
.animate-scale-in-hor-center {
  animation: scale-in-hor-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes scale-in-hor-center {
  0% {
    transform: scaleX(0);
    opacity: 1;
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>
