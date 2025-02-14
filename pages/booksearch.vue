<template>
  <Toaster/>
  <div class="min-h-screen bg-background p-8">
    <div class="max-w-2xl mx-auto space-y-8">
      <div class="text-center">
        <div class="grid grid-cols-2 w-full">
          <h1 class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Encuentra libros por:
          </h1>
          <Select @update:modelValue="updateFilter">
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un criterio"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup label="Criterios de búsqueda">
                <SelectItem value="title">Título</SelectItem>
                <SelectItem value="author">Autor</SelectItem>
                <SelectItem value="isbn">ISBN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <p class="mt-2 text-gray-400">Varios libros al alcance de tu mano</p>
      </div>

      <div class="relative group">
        <Input
            v-model="searchQuery"
            class="w-full py-6 px-4 rounded-full border border-gray-700 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-400"
            placeholder="Ingresa nombre o ISBN"
            type="text"
            @keyup.enter="searchBooks"
        />
        <Button
            :disabled="isLoading"
            class="absolute right-2 top-2 bg-primary text-white px-6 py-4 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            @click="searchBooks"
        >
          <Icon v-if="!isLoading" class="h-5 w-5" name="heroicons:magnifying-glass-20-solid"/>
          <Icon v-else class="h-5 w-5 animate-spin" name="svg-spinners:90-ring-with-bg"/>
        </Button>
      </div>
      <div ref="bookShowcase">
        <BookResume v-for="book in books" :book="book"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {Input} from '~/components/ui/input';
import {Button} from '~/components/ui/button';
import type {Book} from "~/lib/types.js";
import {useToast} from "~/components/ui/toast";
import BookResume from "~/components/books/BookResume.vue";
import autoAnimate from "@formkit/auto-animate";

const searchQuery = ref('');
const isLoading = ref(false);
const books = ref<Book[]>([]);
const bookShowcase = ref<HTMLElement>();
const filter = ref<string>('');
const toaster = useToast();

onMounted(() => {
  autoAnimate(<HTMLElement>bookShowcase.value);
});

const updateFilter = (value: string) => {
  filter.value = value;
}
const searchBooks = async () => {
  if (!searchQuery.value) {
    toaster.toast({title: 'Error', description: 'La búsqueda está vacía!', variant: 'destructive'});
    return;
  }
  if (!filter.value) {
    toaster.toast({title: 'Error', description: 'Selecciona un criterio de búsqueda!', variant: 'destructive'});
    return;
  }
  switch (filter.value) {
    case 'title':
      throw new Error('No implementado');
      break;
    case 'author':
      throw new Error('No implementado');
      break;
    case 'isbn':
      searchByISBN(searchQuery.value);
      break;
  }
};

const searchByISBN = async (isbn: string): Promise<void> => {
  try {
    isLoading.value = true;
    const response = await fetch(
        `https://openlibrary.org/isbn/${searchQuery.value}.json`
    );

    if (!response.ok) throw new Error('Libro no encontrado');

    const data = await response.json();
    books.value.push(data);
  } catch (error) {
    const err = error as Error;
    toaster.toast({title: 'Error', description: err.message});
  } finally {
    isLoading.value = false;
  }
}


</script>
