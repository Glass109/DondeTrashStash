<script lang="ts" setup>
import type {Picture} from '~/lib/types';
import {useToast} from "~/components/ui/toast";
import {ref} from "vue";
import {useMouseInElement} from "@vueuse/core";

const props = defineProps<Picture>()
const emit = defineEmits(["delete", "edit"])
const {toast} = useToast()
const onError = () => {
  toast({title: "Error al cargar imagen",description: "Se eliminará de la galería", variant: "destructive"})
  emit("delete")
}

const target = ref(null)
const {elementX, elementY, isOutside, elementWidth, elementHeight } = useMouseInElement(target)
const cardTransform = computed(() => {
  const MAX_ROTATION = 6
  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2)
  const rY = (MAX_ROTATION / 2 - (elementX.value / elementWidth.value) * MAX_ROTATION).toFixed(2)
  return isOutside.value ? '' : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${-rY}deg)`
})
</script>

<template>
  <div
      id="maindiv"
      ref="target"
      class="relative shadow bg-gradient-to-br from-gray-100 to-gray-400 p-1 flex-col text-white rounded-2xl group overflow-clip hover:scale-105 hover:z-50  duration-500 ease-in-out">
    <img @error="onError" :src="props.url" class="rounded-2xl w-full group-hover:blur-sm  duration-700"/>
    <p class="cursor-pointer hover:animate-pulse font-bold w-10/12 absolute opacity-0 group-hover:opacity-100 left-6 top-1/2 text-center text-lg  duration-700"
       @click="$emit('edit')">
      {{ props.description }}</p>
    <div
        class="absolute top-5 right-5 opacity-0 group-hover:opacity-80   hover:text-red-200 cursor-pointer"
        @click="$emit('delete')"
    >
      <Icon name="lucide:file-x" size="2em"></Icon>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
#maindiv{
  transform: v-bind(cardTransform);
  transition: transform 0.1s;
}
</style>
