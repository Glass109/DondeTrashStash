<script lang="ts" setup>
import type {Picture} from '~/lib/types';

const props = defineProps<Picture>()
const emit = defineEmits(["delete", "edit"])
</script>

<template>
  <div
      class="relative shadow bg-gradient-to-br from-gray-100 to-gray-400 p-1 flex-col text-white rounded-2xl group overflow-clip hover:scale-105 hover:z-50  duration-500 ease-in-out">
    <img :src="props.url" class="rounded-2xl w-full group-hover:blur-sm  duration-700"/>
    <p class="absolute opacity-0 group-hover:opacity-100 top-1/2 text-center w-full text-lg  duration-700">
      {{ props.description }}</p>
    <div
        class="absolute top-5 right-5 opacity-0 group-hover:opacity-80   hover:text-red-200 cursor-pointer"
        @click="$emit('delete')"
    >
      <Icon name="lucide:file-x" size="2em"></Icon>
    </div>
    <div
        class="absolute top-5 left-5 opacity-0 group-hover:opacity-80   hover:text-yellow-200 cursor-pointer"
        @click="$emit('edit')"
    >
      <Icon name="lucide:file-pen" size="2em"></Icon>
    </div>
  </div>
</template>

<style scoped>

</style>
