<template>
  <div class="flex items-center justify-center min-h-screen">
    <UButton
      size="lg"
      color="primary"
      class="draw-button"
      @click="drawCard"
      :class="{ 'clicked': isClicked }"
    >
      カードをひく
    </UButton>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["buttonClick"]);
const isClicked = ref(false);

const drawCard = () => {
  isClicked.value = true;
  setTimeout(() => {
    isClicked.value = false;
  }, 300);
  console.log("fo")
  emit("buttonClick");
}
</script>

<style scoped>
.draw-button {
  font-size: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.draw-button.clicked {
  transform: scale(1.1);
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.6);
}
</style>
