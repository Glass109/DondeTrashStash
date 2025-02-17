<script lang="ts" setup>
import {ref} from "vue";

const data = ref<string>(""); // Initialize with an empty string
const postData = ref<string>(""); // Initialize with an empty string
const formData = ref({
  name: "Raul",
  post: "Hola"
})
const getData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then((response) => response.json())
      .then((json) => {
        // Pretty-print the JSON with 2 spaces indentation
        data.value = JSON.stringify(json, null, 2);
        console.log(json);
      });
}
const getPostData = () => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify(formData.value),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
      .then((response) => response.json())
      .then((json) => postData.value = JSON.stringify(json, null, 2));

}
</script>

<template>
  <main class="bg-gradient-to-br from-teal-50 to-teal-200 min-h-screen">
    <div class="container mx-auto border shadow p-6">
      <h1>GET TEST</h1>
      <br>
      <Button @click="getData">Obtener datos!</Button>
      <!-- Use <pre> tag to preserve formatting -->
      <pre>{{ data }}</pre>
    </div>
    <div class="container mx-auto border shadow p-6">
      <h1>POST TEST</h1>
      <div class="flex flex-col gap-2">
      <label for="name">Nombre</label>
      <input v-model="formData.name" name="name" type="text">
      <label for="post">Post</label>
      <input v-model="formData.post" name="ñost" type="text">
      </div>
      <br>
      <Button @click="getPostData">Postear datos!</Button>
      <!-- Use <pre> tag to preserve formatting -->
      <pre>{{ postData }}</pre>
    </div>

  </main>
</template>

<style scoped>
input {
  @apply border border-black rounded
}
h1 {
  @apply text-2xl font-bold
}
</style>
