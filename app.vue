<template>
  <Toaster/>
  <div>
    <NuxtPage/>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.6s cubic-bezier(0.68, -0.6, 0.32, 1.6);
}

.page-enter-from {
  filter: blur(50px);
  opacity: 0;
  transform: scale(0.8);
}

.page-leave-to {
  opacity: 0;
  filter: blur(50px);
  transform: scale(1.2);
}
</style>
