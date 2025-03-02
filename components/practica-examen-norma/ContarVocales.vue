<script setup lang="ts">
const texto = ref('')
const vocales = ['a', 'e', 'i', 'o', 'u']
const numVocales = computed(() => {
  const textoLower = texto.value.toLowerCase()
  const vocales = ['a', 'e', 'i', 'o', 'u']
  return textoLower.split('').filter(letra => vocales.includes(letra)).length
})
const highlightedText = computed(() => {
  return texto.value.split('').map(char => {
    if (vocales.includes(char.toLowerCase())) {
      return `<span class="text-red-500">${char}</span>`
    }
    return char
  }).join('')
})

</script>

<template>
  <div>
    <Label>Ingrese el texto para contar sus vocales (Sin contar a la Y)</Label>
    <Input type="text" v-model="texto" placeholder="Ingresa un texto"/>
    <p class="text-xl">Vocales: {{numVocales}}</p>
    <p class="text-xl" v-html="highlightedText"></p>
  </div>
</template>

<style scoped>
.text-red-500 {
  color: red;
}
</style>