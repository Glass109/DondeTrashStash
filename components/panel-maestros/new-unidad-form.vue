<script setup lang="ts">
import type {Asignatura, UnidadDeAprendizaje} from "~/lib/types.js";
import {useToast} from "~/components/ui/toast";

const props = defineProps<{ asignaturaId: number }>()
const refreshData = inject('fetchData') as () => void
const {toast} = useToast()
const onCrearUnidad = (event: SubmitEvent) => {
  const form = new FormData(event.target as HTMLFormElement)
  const data = Object.fromEntries(form.entries()) as unknown as UnidadDeAprendizaje
  // Convierte los campos numéricos a números
  data.AsignaturaID = props.asignaturaId
  data.Semanas = Number(data.Semanas)
  data.Conocimiento = Number(data.Conocimiento)
  data.Desempeño = Number(data.Desempeño)
  data.TareaIntegradora = data.TareaIntegradora as unknown as string != 'false'
  data.AsignaturaID = props.asignaturaId
  // console.log(data)
  // return
  fetch(useRuntimeConfig().public.BACKEND_URL + '/unidades/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      toast({title: "Unidad agregada", description: "La unidad ha sido agregada exitosamente"})
      refreshData!()
    } else {
      toast({title: "Error", description: "Hubo un problema al agregar la unidad"})
    }
  }).catch(console.error)
}

</script>
<template>
  <div>
    <h2 class="font-bold">Agregar unidad de aprendizaje a la asignatura #{{ props.asignaturaId }}</h2>
    <form @submit.prevent="(e: Event) => onCrearUnidad(e as SubmitEvent)">
      <div>
        <label for="Nombre">Nombre</label>
        <input type="text" name="Nombre" required>
      </div>
      <div>
        <label for="Competencia">Competencia</label>
        <textarea name="Competencia" required></textarea>
      </div>
      <div>
        <label for="Semanas">Semanas</label>
        <input min="0" max="100" type="number" name="Semanas" required>
      </div>
      <div>
        <label for="Producto">Producto</label>
        <textarea name="Producto" required></textarea>
      </div>
      <div>
        <label for="TareaIntegradora">¿Integradora?</label>
        <div class="w-full">
          <input type="radio" name="TareaIntegradora" value="true">
          <label for="TareaIntegradora">Sí</label>
        </div>
        <div class="w-full">
          <input type="radio" name="TareaIntegradora" value="false">
          <label for="TareaIntegradora">No</label>
        </div>
      </div>
      <div>
        <label for="Conocimiento">Conocimiento</label>
        <input min="0" max="100" type="number" name="Conocimiento" required>
      </div>
      <div>
        <label for="Desempeño">Desempeño</label>
        <input min="0" max="100" type="number" name="Desempeño" required>
      </div>
      <Button type="submit">Agregar</Button>
    </form>
  </div>
</template>

<style scoped>
form > div {
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
}

form > div > label {
  width: 20%;
  margin-right: 1rem;
  text-align: right;
}

form > div > input, form > div > textarea {
  width: 80%;
  border-radius: 1em;
  padding: 0.5em;
  border: 1px solid #ccc;
}

input[type="radio"] {
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
}
</style>