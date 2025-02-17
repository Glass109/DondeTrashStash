<script setup lang="ts">
import { ref, watch } from "vue";
import {useToast} from "~/components/ui/toast";

const DIRECTORY_URL = "https://api.github.com/repos/carlosascari/Mexico.json/contents/Yucatán"
const response = await fetch(DIRECTORY_URL);3
const {toast} = useToast();
if (!response.ok) {
  toast({title: "Error", description: "No se pudo obtener la lista de municipios", variant: "destructive"});
}
const municipios = await response.json();
const localidades = ref<String | undefined>()
const selected_municipio = ref<String | undefined>()
// We fetch localidad based on selected_municipio, only when it gets set

watch(selected_municipio, async (newValue) => {
  if (newValue) {
    const localidadResponse = await fetch(newValue);
    if (!localidadResponse.ok) {
      toast({title: "Error", description: "No se pudo obtener la lista de localidades", variant: "destructive"});
    }
    localidades.value = await localidadResponse.json();
    toast({title: "Éxito", description: "Se obtuvo la lista de localidades"});

  }
});
</script>

<template>
  <Toaster/>
  <main class="bg-gradient-to-br from-green-100 via-purple-100 to-orange-100 min-h-screen grid place-items-center">
    <div class="container border shadow bg-background">
      <form class="flex flex-col gap-2 p-4">
        <h1 class="font-bold text-4xl bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Consulta</h1>
        <small class="text-muted-foreground">PD: Si no funciona, probablemente me banearon de Github por andar abusando de su API</small>
        <div class="grid gap-2 grid-cols-2">
          <Select v-model:model-value="selected_municipio">
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un municipio"/>
              <SelectContent>
                <SelectItem :value="municipio.download_url" v-for="municipio in municipios">{{municipio.name.replace('.json', '')}}</SelectItem>
              </SelectContent>
            </SelectTrigger>
          </Select>
          <Select :disabled="!selected_municipio">
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una localidad"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem v-for="localidad in localidades" :value="localidad.nombre">{{localidad.nombre}}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
select {
  flex-grow: 1;
}
</style>