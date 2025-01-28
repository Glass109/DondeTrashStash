<script setup lang="ts">
import {ref} from 'vue';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Book} from "~/lib/types.js";
import {useToast} from "~/components/ui/toast";
import BookResume from "~/components/books/BookResume.vue";

const searchQuery = ref('');
const isLoading = ref(false);
const books = ref<Book[]>([]);
const filter = ref<string>('');
const toaster = useToast();

const updateFilter = (value) => {
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
      searchByTitle(searchQuery.value);
      break;
    case 'author':
      searchByAuthor(searchQuery.value);
      break;
    case 'isbn':
      searchByISBN(searchQuery.value);
      break;
  }
};

const searchByISBN = async (isbn: string): void =>{
  try {
    isLoading.value = true;
    const response = await fetch(
        `https://openlibrary.org/isbn/${searchQuery.value}.json`
    );

    if (!response.ok) throw new Error('Libro no encontrado');

    const data = await response.json();
    books.value.push(data);
  } catch (error) {
    toaster.toast({title: 'Error', message: error.message});
  } finally {
    isLoading.value = false;
  }
}
</script>

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
            type="text"
            placeholder="Ingresa nombre o ISBN"
            class="w-full py-6 px-4 rounded-full border border-gray-700 focus:border-blue-500 transition-all duration-300 group-hover:border-blue-400"
            @keyup.enter="searchBooks"
        />
        <Button

            @click="searchBooks"
            :disabled="isLoading"
            class="absolute right-2 top-2 bg-primary text-white px-6 py-4 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon v-if="!isLoading" name="heroicons:magnifying-glass-20-solid" class="h-5 w-5"/>
          <Icon v-else name="svg-spinners:90-ring-with-bg" class="h-5 w-5 animate-spin"/>
        </Button>
      </div>

      <BookResume v-for="book in books" :book="book"/>
    </div>
  </div>
</template>