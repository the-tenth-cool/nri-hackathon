<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div v-if="visibleButton" class="flex flex-col">
      <button
        @click="buttonClick"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out text-xl"
        :class="{ 'scale-110': isClicked, 'opacity-0 transition-opacity duration-400': isClicked }"
      >
        カードをひく
      </button>
    </div>
    <div v-if="visiblePack" class="w-full flex justify-center">
      <div class="w-1/3 flex flex-col">
        <div
          class="h-24 w-full bg-red-200"
          :class="{ 'animate-slide-in-bottom': !invisiblePack, 'animate-swing-out-right-bck': invisiblePack }"
        ></div>
        <URange
          v-model="range"
          color="purple"
          size="lg"
          class="z-[1000]"
          :class="{ 'animate-slide-in-bottom': !invisiblePack, 'animate-slide-out-bottom': invisiblePack }"
        />
        <div
          class="h-[32rem] w-full bg-blue-200"
          :class="{ 'animate-slide-in-bottom': !invisiblePack, 'animate-slide-out-bottom': invisiblePack }"
        ></div>
      </div>
    </div>
    <div v-if="visibleCards && cardsDrawn" class="w-full h-full flex justify-center items-center">
      <div class="relative h-[34rem] aspect-[3/4]">
        <div
          v-for="(card, index) in drawedCard"
          :key="index"
          class="absolute inset-0"
          :style="{ zIndex: drawedCard.length - index }"
          @click="showCardCount++"
        >
          <CardLarge
            :card="card"
            :class="{ 'animate-slide-in-bottom': index >= showCardCount, 'animate-slide-out-top': index < showCardCount }"
          >
          </CardLarge>
        </div>
      </div>
    </div>
    <div v-if="visibleReturnButton" class="flex flex-col">
      <button
        @click="router.push('/')"
        class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-200 ease-in-out text-xl animate-slide-in-bottom"
      >
        トップへ戻る
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AvailableCard } from '~/interfaces/card';
const { apiOrigin } = useRuntimeConfig().public

const router = useRouter()
const drawedCard = ref<AvailableCard[]>([])
const displayedCards = ref<AvailableCard[]>([])
const isClicked = ref(false)
const cardsDrawn = ref(false)
const range = ref<number>(0);
const visibleButton = ref(true);
const visiblePack = ref(false);
const visibleCards = ref(false);
const invisiblePack = computed(() => {
  if (range.value === 100) {
    setTimeout(() => {
      visiblePack.value = false;
      visibleCards.value = true;
    }, 800);
    return true;
  }
  return false;
});
const showCardCount = ref(0);
const visibleReturnButton = ref(false);
watch(showCardCount, (newValue) => {
  if (newValue >= 3) {
    setTimeout(() => {
      visibleCards.value = false;
      visibleReturnButton.value = true;
    }, 400);
  }
})

const buttonClick = async () => {
  getCards();
  isClicked.value = true;
  setTimeout(() => {
    visibleButton.value = false;
    visiblePack.value = true;
  }, 400);
}

const getCards = async () => {
  drawedCard.value = await $fetch<AvailableCard[]>(`${apiOrigin}/draw_cards`);
  cardsDrawn.value = true;
  drawedCard.value.forEach((card) => {
    card.type = "available";
  })
  console.log(drawedCard.value);
}
</script>
