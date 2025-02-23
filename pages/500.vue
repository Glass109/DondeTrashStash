<script setup lang="ts">
const tweakingGifts = [
    "https://media1.tenor.com/m/QXe6qbCl_-AAAAAd/ishowspeed-speed.gif",
    "https://media1.tenor.com/m/3RuF9Lb5o2wAAAAC/cat-crazy.gif",
    "https://media.tenor.com/_mX0c3gT8icAAAAM/tweaking-wegeekinghard.gif",
    "https://media1.tenor.com/m/zO-nxheF1TYAAAAd/guy-limbs-restricted.gif",
    "https://media1.tenor.com/m/U5XLEZPzydgAAAAC/tweaking-out-black-guy-tweaking-meme.gif",
    "https://media1.tenor.com/m/Fyh8hKzh0loAAAAC/agony-rolling.gif",
    "https://media1.tenor.com/m/SPn4ESL12JgAAAAC/going-crazy-mr-boss.gif",
    "https://media1.tenor.com/m/VtXolpDGKDQAAAAC/spongebob-sponge.gif"
]
const randomElement = tweakingGifts[Math.floor(Math.random() * tweakingGifts.length)];
const router = useRouter();
</script>

<template>
<main class="mainpage gradientbackground">
  <div class="flex flex-col">
    <div class="size-[400px] mx-auto object-fill">
      <img :src="randomElement" alt="Tweaking gif" class="w-full h-full object-cover" />
    </div>
    <div class="mb-4 text-5xl text-center">
      <p>Algo salió mal,<span class="font-bold"> y es tu culpa</span>, <span class="text-muted-foreground">probablemente...</span></p>
    </div>
    <div class="w-full grid grid-cols-2 gap-4">
      <Button variant="secondary" @click="navigateTo('/')">Volver a la página principal</Button>
      <Button @click="router.back()">Regresar</Button>
    </div>
  </div>
</main>
</template>

<style scoped>
.size-\[400px\] {
  width: 400px;
  height: 400px;
}
</style>