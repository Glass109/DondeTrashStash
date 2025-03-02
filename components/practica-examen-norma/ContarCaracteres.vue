<script setup lang="ts">
const texto = ref('');
const textoLength = computed(() => texto.value.length);
const textoLenghtNoSpaces = computed(() => texto.value.replace(/\s/g, '').length);
</script>

<template>
  <div>
    <Label>Contar caracteres</Label>
    <Input type="text" v-model="texto" placeholder="Ingresa un texto" />
    <small>Caracteres totales: {{ textoLength }}, Sin contar espacios: {{ textoLenghtNoSpaces}}</small>
  </div>
</template>

<style scoped>

</style>