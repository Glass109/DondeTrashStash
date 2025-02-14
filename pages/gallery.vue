<script lang="ts" setup>
import {ref} from 'vue';
import type {Picture} from "~/lib/types";
import autoAnimate from "@formkit/auto-animate";
import {useToast} from "~/components/ui/toast";
import {rand} from "@vueuse/core";

const imageContainer = ref<HTMLElement>();
const {toast} = useToast();
const marqueeSpeed = ref<number>(50);
const pictures = ref<Picture[]>([
  {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  }, {
    url: `https://picsum.photos/id/${rand(1, 1000)}/400`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  },
]);

function onDelete(url: string) : void {
  const index = pictures.value.findIndex(picture => picture.url === url);
  if (index !== -1) {
    pictures.value.splice(index, 1);
  }
}

function showAddPictureDialog() : void {
  var url = prompt("URL de la imagen a agregar (No hay dinero para el backend)");
  if(!url) return
  var description = prompt("Descripción de la imagen");
  if (url && description) {
    pictures.value.unshift({url, description});
    toast({title: "Imagen agregada a la galería", description: "Debería mostrarse en unos momentos"})
  }
}

function showEditDescriptionDialog(url: string): void {
  const index = pictures.value.findIndex(picture => picture.url === url);
  if (index === -1) return;

  var newDescription = prompt('Descripción nueva...')
  if (!newDescription) return
  if (newDescription?.length < 5) {
    alert("Mínimo 5 carácteres")
    return
  }
  pictures.value[index].description = newDescription
  toast({title: "Descripción actualizada", description: "La descripción de la imagen ha sido actualizada"})
}

</script>

<template>
  <Toaster/>
  <main>
    <div class="flex justify-evenly items-center px-10 py-4 mb-8 border-b-2 border-teal-500 shadow bg-teal-50/70">
      <span></span>
      <select v-model="marqueeSpeed" class="w-[100px]">
        <option value="20">Lento</option>
        <option value="50">Normal</option>
        <option value="100">Rápido</option>
      </select>
      <h1 class="text-5xl text-teal-600">Galería</h1>
      <Button @click="showAddPictureDialog" class="bg-teal-100 text-teal-600" size="icon">
        <Icon name="lucide:image-up" size="2em"></Icon>
      </Button>
    </div>
    <NuxtMarquee pause-on-hover :auto-fill="true" :speed="marqueeSpeed">
      <ImageShowcase v-for="(picture) in pictures.slice(pictures.length/2)"
                     class="mr-4"
                     :key="picture.url"
                     :description="picture.description"
                     :url="picture.url"
                     @delete="onDelete(picture.url)"
                     @edit="showEditDescriptionDialog(picture.url)"
      />
    </NuxtMarquee>
    <br>
    <NuxtMarquee pause-on-hover :auto-fill="true" direction="right" :speed="marqueeSpeed">
      <ImageShowcase v-for="(picture) in pictures.slice(0,pictures.length/2)"
                     class="mr-4"
                     :key="picture.url"
                     :description="picture.description"
                     :url="picture.url"
                     @delete="onDelete(picture.url)"
                     @edit="showEditDescriptionDialog(picture.url)"
      />
    </NuxtMarquee>
  </main>
</template>

<style scoped>
@-webkit-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling-reverse {
  100% {
    background-position: 50px 50px;
  }
}
@-webkit-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-moz-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@-o-keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
@keyframes bg-scrolling {
  0% {
    background-position: 50px 50px;
  }
}
/* Main styles */
main {
  color: #999;
  font: 400 16px/1.5 exo, ubuntu, "segoe ui", helvetica, arial, sans-serif;
  text-align: center;
  /* img size is 50x50 */
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAABnSURBVHja7M5RDYAwDEXRDgmvEocnlrQS2SwUFST9uEfBGWs9c97nbGtDcquqiKhOImLs/UpuzVzWEi1atGjRokWLFi1atGjRokWLFi1atGjRokWLFi1af7Ukz8xWp8z8AAAA//8DAJ4LoEAAlL1nAAAAAElFTkSuQmCC") repeat 0 0;
}
</style>
