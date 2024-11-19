<template>
  <div class="h-screen flex flex-col">
    <header class="bg-white shadow-lg px-6 py-5 mb-4">
      <Header></Header>
    </header>
    <main class="flex-grow overflow-auto">
      <slot></slot>
      <UNotifications />
    </main>
  </div>
</template>
