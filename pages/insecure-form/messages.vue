<script setup lang="ts">
import {definePageMeta} from "#imports";
definePageMeta({
  title: 'Messages',
  description: 'Messages page',
  middleware: ['check-signed-in-cookie']
});
const loggedUser = useCookie('user', {watch: true});
function logout () {
  loggedUser.value = null
  navigateTo('/insecure-form');
}

</script>

<template>
<h1>Loggeado!</h1>
  <Button @click="logout" variant="destructive">Cerrar sesión</Button>
</template>

<style scoped>

</style>