<script lang="ts" setup>

</script>

<template>
  <div class="relative">
    <div
        class="z-10 shadow absolute w-full md:w-3/5 left-0 diagonal-container grid justify-items-center md:text-4xl transition-all min-h-screen items-center">
      <NuxtLink to="/booksearch">Buscador de libros 📖</NuxtLink>
      <NuxtLink to="/gallery">Galería interactiva 🖼️</NuxtLink>
      <NuxtLink to="/post-testing">Prueba de POST ✉️</NuxtLink>
      <NuxtLink to="/buscador-de-localidades">Buscador de localidades 🗺️</NuxtLink>
      <NuxtLink to="/insecure-form">Formulario inseguro 🔫</NuxtLink>
      <NuxtLink to="/panel-maestros">Panel de maestros 📚</NuxtLink>
    </div>
    <div class="absolute right-0 hidden md:block h-screen w-2/3">
      <img class="size-full" src="https://media1.tenor.com/m/xLWp_KWMFCEAAAAC/south-park-eric-cartman.gif"
           alt="Cartman">
    </div>
  </div>


</template>

<style scoped>
a {
  @apply transition-all duration-300;
}

a:hover {
  @apply text-green-400 drop-shadow-md scale-105 -translate-y-2;
}

.diagonal-container {
  @apply backdrop-blur;
  background-image: linear-gradient(80deg, white 60%, transparent);
  clip-path: polygon(0 0, 85% 0, 100% 100%, 0 100%);
}
</style>