<script setup lang="ts">
import {definePageMeta} from "#imports";
import InsecureMessage from "~/components/insecure-form/messages/insecure-message.vue";
definePageMeta({
  title: 'Messages',
  description: 'Messages page',
  middleware: ['check-signed-in-cookie']
});
const messages = ref([]);
const loggedUser = useCookie('user', {watch: true});
function logout () {
  loggedUser.value = null
  navigateTo('/insecure-form');
}
const fetchMessages = async () => {
  const response = await fetch(useRuntimeConfig().public.BACKEND_URL + 'diegoapi/posts');
  console.table(response);
  messages.value = await response.json();
};
const newMessage = () => {
  const Title = prompt('Titulo del mensaje');
  const Content = prompt('Contenido del mensaje');
  //@ts-ignore
  const UserId = loggedUser.value?.ID;
  if (!Title || !Content || !UserId){
    console.log('No se puede crear el mensaje, faltan datos');
    return;
  }
  fetch(useRuntimeConfig().public.BACKEND_URL + 'diegoapi/posts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({Title, Content, UserId})
  }).then(fetchMessages).catch(console.error);
};

onMounted(fetchMessages);

</script>

<template>
<main class="mainpage gradient-background">
  <div class="fixed top-2 right-2">
    <Button variant="destructive" @click="logout">Logout</Button>
    <Button @click="newMessage">Nuevo mensaje</Button>
  </div>
  <div v-if="messages.length > 0">
    <h1 class="gradient-background text-6xl text-transparent bg-clip-text">Messages</h1>
    <div v-auto-animate class="flex gap-4 flex-wrap justify-center">
      <insecure-message v-for="post in messages" :post="post" />
    </div>
  </div>
  <div v-else>
    <h1 class="animate-pulse p-4 drop-shadow-lg shadow-white bg-gradient-to-b from-white via-gray-400 to-black text-8xl text-transparent bg-clip-text">Cargando</h1>
  </div>
</main>

</template>
