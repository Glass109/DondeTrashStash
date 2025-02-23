<script setup lang="ts">
import {ref, onMounted} from 'vue';
import Matter from 'matter-js';
import {useElementBounding, useMediaQuery} from '@vueuse/core';
import {useMatterWorld} from '~/composables/useMatterWorld';

definePageMeta({
  title: 'Insecure Form',
  description: 'Insecure form page'
});
const canvas = ref<HTMLElement>();
const card = ref();
const loggedUser = useCookie('user', {watch: true});
const {x, y, width, height} = useElementBounding(card);
const tabsValue = ref('login');
let matterWorld: ReturnType<typeof useMatterWorld>;
const isMobile = useMediaQuery('(max-width: 640px)');
const loginFormData = ref({
  username: undefined,
  password: undefined
});
const registerFormData = ref({
  Username: undefined,
  Password: undefined,
  Email: undefined
});
type User = {
  Username: string;
  Password: string;
  Email: string;
};

const onLogin = async () => {
  console.log('Login form submitted', loginFormData.value);
  fetch('http://localhost:8080/users')
      .then((res) => res.json())
      .then((data) => {
        console.log('Data fetched', data);
        data.filter((user: User) => {
          if (user.Username === loginFormData.value.username &&
              user.Password === loginFormData.value.password) {
            console.log('User found', user);
            loggedUser.value = JSON.stringify(user);
            navigateTo('/insecure-form/messages');
          }
        });
      })
      .catch((err) => console.error(err));
};

const onRegister = () => {
  console.log('Register form submitted', registerFormData.value);
  fetch('http://localhost:8080/users/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerFormData.value)
  })
      .then((res) => res.json())
      .then((data) => {
        console.log('Data fetched', data);
        navigateTo('/insecure-form?message=Usuario registrado correctamente');
        location.reload();
      })
      .catch((err) => console.error(err));
};
onMounted(() => {
  // Create a static body for your form card
  const formCardBox = Matter.Bodies.rectangle(
      x.value + width.value / 2,
      y.value + height.value / 2,
      width.value,
      height.value,
      {
        isStatic: true,
        render: {fillStyle: 'transparent'} // Make it invisible
      }
  );

  // Initialize the physics world
  matterWorld = useMatterWorld({
    canvasRef: canvas,
    staticBodies: isMobile.value ? [] : [formCardBox],
    blockCount: 20
  });

  watch([x, y, width, height], ([newX, newY, newWidth, newHeight]) => {
    if (matterWorld && formCardBox) {
      matterWorld.updateStaticBody(
          formCardBox,
          newX,
          newY,
          newWidth,
          newHeight
      );
    }
  });
  let counter = 0;
  const max_blocks = isMobile? 30 : 150;
  // Add new blocks periodically
  const addBlockInterval = setInterval(() => {
    matterWorld.addBlock()
    counter += 1;
    if (counter > max_blocks) {
      clearInterval(addBlockInterval);
    }
  }, 100);
});
</script>

<template>

  <div ref="canvas" class="absolute inset-0 w-screen h-screen z-10"/>
  <main class="mainpage gradientbackground">
    <div ref="card" class=" z-20 p-4 bg-card rounded-xl text-card-foreground shadow-lg">
      <h1 class="text-center font-extrabold">Bienvenido a la plataforma de Soluciones Inseguras & Co</h1>
      <small class="block text-center text-muted-foreground text-sm">Desarrollado por la división de Entornos
        Virtuales</small>
      <div class="flex justify-center">
        <img class="size-[120px]" src="https://media1.tenor.com/m/Np_76U9KyfoAAAAd/woo-yeah-oh-yeah.gif"
             alt="Mono bailando">
      </div>
      <Tabs orientation="vertical" v-model:model-value="tabsValue">
        <TabsList class="md:w-full">
          <TabsTrigger class="w-full" value="login">Iniciar sesión</TabsTrigger>
          <TabsTrigger class="w-full" value="register">Registrarse</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form @submit.prevent="onLogin" class="flex flex-col gap-2">
            <Label for="username">Nombre de usuario</Label>
            <Input v-model:model-value="loginFormData.username" type="text" id="username" name="username" required/>
            <Label for="password">Contraseña</Label>
            <Input v-model:model-value="loginFormData.password" type="password" id="password" name="password" required/>
            <Button type="submit">Inciar sesión</Button>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form @submit.prevent="onRegister" class="flex flex-col gap-2">
            <Label for="username">Nombre de usuario</Label>
            <Input v-model:model-value="registerFormData.Username" type="text" id="username" name="username" required/>
            <Label for="password">Contraseña</Label>
            <Input v-model:model-value="registerFormData.Password" type="password" id="password" name="password"
                   required/>
            <Label for="email">Correo Electrónico</Label>
            <Input v-model:model-value="registerFormData.Email" type="email" id="email" name="email" required/>
            <Button type="submit" class="btn btn-primary">Registrarse</Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  </main>

</template>

<style scoped>

</style>