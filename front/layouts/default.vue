<template>
  <div class="h-screen flex flex-col">
    <header class="bg-white shadow-lg px-6 py-2 mb-4">
      <Header @click-account="console.log('foo')"></Header>
    </header>
    <main class="flex-grow overflow-auto">
      <slot></slot>
      <UNotifications />
    </main>
  </div>
</template>
