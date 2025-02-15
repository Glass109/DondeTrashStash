<script lang="ts" setup>

</script>

<template>
  <div class="container mx-auto grid justify-items-center text-4xl transition-all min-h-screen items-center">
    <NuxtLink to="/booksearch">Buscador de libros</NuxtLink>
    <NuxtLink to="/gallery">Galería interactiva</NuxtLink>
    <NuxtLink to="/post-testing">Prueba de POST</NuxtLink>
  </div>
</template>

<style scoped>
a:hover{
  @apply text-green-400;
}
</style>
