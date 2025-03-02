<script setup lang="ts">
const texto = ref('')
const reversedText = computed(() => texto.value.split('').reverse().join(''))
</script>

<template>
  <div>
    <Label>Ingrese el texto a revertir</Label>
    <Input type="text" v-model="texto" placeholder="Ingresa un texto" />
    <Label>Texto revertido:</Label>
    <Input type="text" disabled :value="reversedText"/>
  </div>
</template>

<style scoped>

</style>