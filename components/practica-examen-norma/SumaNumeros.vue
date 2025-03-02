<script setup lang="ts">

const values = reactive({
  num1: 0,
  num2: 0
})
</script>

<template>
  <Label>Ingresa dos numeros</Label>
  <div class="flex gap-2">
    <Input type="number" v-model="values.num1" placeholder="Numero 1" />
    <p>+</p>
    <Input type="number" v-model="values.num2" placeholder="Numero 2" />
    <p>=</p>
    <p class="text-destructive">{{ values.num1 + values.num2 }}</p>
  </div>
</template>

<style scoped>

</style>