<template>
  <p>available card</p>
  <p>{{ route.params["id"] }}</p>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
