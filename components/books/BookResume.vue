<script setup>
const props = defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <Card class="space-y-6">
    <div class="rounded-xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <div class="flex gap-6">
        <img
            :src="book.isbn_10 && book.isbn_10.length > 0 ? `https://covers.openlibrary.org/b/isbn/${book.isbn_10[0]}-L.jpg` : 'https://placeholder.pagebee.io/api/plain/150/200?text=Sin+Portada'"
            alt="Book cover"
            class="w-32 h-48 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <div class="flex-1 space-y-4">
          <h2 class="text-2xl title">{{ book.title }}</h2>
          <p class="text-gray-400" v-if="book.authors">
            por {{ book.authors.join(', ') }}
          </p>
          <div class="space-y-2">
            <p v-if="book.publish_date">
              Publicado: {{ book.publish_date }}
            </p>
            <p v-if="book.number_of_pages">
              Páginas: {{ book.number_of_pages }}
            </p>
            <p v-if="book.publishers">
              Editorial: {{ book.publishers.join(', ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.title {
  @apply font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-500
}
</style>