<script setup lang="ts">
import {ref} from 'vue'
import type {Asignatura} from "~/lib/types";
import TablaAsignatura from "~/components/panel-maestros/tabla-asignatura.vue";
import NewAsignaturaForm from "~/components/panel-maestros/new-asignatura-form.vue";
import {useToast} from "~/components/ui/toast";


const fetchedAsignaturas = ref<Asignatura[]>([])
const router = useRouter()
const {toast} = useToast()
const fetchData = async () => {
  console.log("Fetching asignaturas")
  const response = await fetch('http://glass109.oops.wtf:8080/asignaturas?preload=true').catch(console.error)
  if (!response) {
    toast({title: "Error", description: "Hubo un problema al cargar las asignaturas"})
    return
  }
  fetchedAsignaturas.value = await response.json()
}
provide('fetchData', fetchData)

onMounted(() => {
  fetchData()
})

</script>

<template>
  <div>
    <Dialog>
      <DialogTrigger class="fixed bottom-2 right-2">
        <Button>Agregar asignatura</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar asignatura</DialogTitle>
          <DialogDescription>Complete los campos para agregar una nueva asignatura</DialogDescription>
        </DialogHeader>
        <NewAsignaturaForm/>
      </DialogContent>
    </Dialog>
    <main class="gradient-background p-4 min-h-screen">
      <!-- Main container    -->
      <div v-auto-animate v-for="asignatura in fetchedAsignaturas">
        <section class="container bg-white p-4 rounded-lg mb-8">
          <tabla-asignatura :asignatura="asignatura"/>
        </section>
      </div>

    </main>
  </div>


</template>

<style scoped>


</style>