<script setup lang="ts">
import type {Asignatura} from "~/lib/types";
import {useToast} from '~/components/ui/toast'
const {toast} = useToast()
const subjects = ['Matemáticas', 'Base de datos', 'Dispositivos móviles', 'Expresión oral y escrita']
const teachers = ['Flores Gongora Roger Armando', 'Cupul Mendez Arturo Augusto', 'Canche Caamal Mirian Magaly', 'De la Cruz Lugo Eric', 'Castillo Salazar Laura Angelina', 'Palma Gamboa Oscar Antonio', 'Canto Bonilla Carlos Alberto', 'Ceballos Hernandez Martha Rocio', 'Villanueva Aranda Karla Eugenia', 'Lara Martin Luisa Margarita', 'Quijano Aban Victor Manuel', 'Uc Miam Aureny Magaly', 'Zapata Vargas Martha Adriana', 'Kao Poot Luis Javier', 'Martin Flores Juan Manuel', 'Quintal Xool Rubi Patricia', 'Marrufo Muñoz Jorge Elias', 'Matos Morfin Victor Manuel', 'Quijano Cruz Bonesi', 'Caballero Aguilar Anibal Antonio', 'Moreno Caballero Eduardo Jesús Miguel', 'Martin Ruiz Mario José', 'Morales Carbajal Yeni', 'Loeza Lugo Fernando de Jesus', 'Chuc Uc Joel Ivan', 'Concha Uicab Alejandro', 'Martinez Dominguez Ruth', 'Medina Medina Joselyn', 'Balam Sandoval Jesus Alejandro', 'May Tuz Diego', 'Morales Zafra Lizeth', 'Solis Ek Angel', 'Chavez Lizama Mariel', 'Chab Lara Carlos', 'Esquivel Pech Norma', 'Rodriguez Mex Cristina', 'Osorio Rodríguez Alan', 'Pech Escamilla Jesús', 'Quintal Warner Michelle', 'Canul Cob Jesus Angel', 'Ruiz Barboza Marlene', 'Mex Mex Aurelio']
teachers.sort()
const durations = [20, 40, 60]
const careers = ['TIC', 'Administración', 'Industrial']
const semesters = ['1er', '2do', '3ero', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo']
const units = [1, 2, 3, 4, 5]

const refreshData = inject('fetchData') as () => void
const onSubmit = (event : SubmitEvent) => {
  const form = new FormData(event.target as HTMLFormElement)
  const data: Asignatura = Object.fromEntries(form.entries()) as unknown as Asignatura
  data.Duracion = Number(data.Duracion)
  data.Cuatrimestre = Number(data.Cuatrimestre) + 1
  // console.table(data)
  // return
  fetch(useRuntimeConfig().public.BACKEND_URL + 'normaapi/asignaturas/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.ok) {
      toast({title: "Asignatura agregada", description: "La asignatura ha sido agregada exitosamente"})
      refreshData!()
    } else {
      toast({title: "Error", description: "Hubo un problema al agregar la asignatura"})

    }
  }).catch(console.error)

}
</script>

<template>
  <form @submit.prevent="(e : Event) => onSubmit(e as SubmitEvent)" class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
    <div>
      <label for="Nombre">Materia</label>
      <select name="Nombre">
        <option selected value="">-</option>
        <option v-for="subject in subjects" :key="subject" :value="subject">{{ subject }}</option>
      </select>
    </div>
    <div>
      <label for="Familia">Familia</label>
      <select name="Familia">
        <option selected value="">-</option>
        <option v-for="carrer in careers" :key="carrer" :value="carrer">{{ carrer }}</option>
      </select>
    </div>
    <div>
      <label for="Duracion">Duración</label>
      <select name="Duracion">
        <option selected value="">-</option>
        <option v-for="d in durations" :key="d" :value="d">{{ d }}</option>
      </select>
    </div>

    <div>
      <label for="Profesor">Profesor</label>
      <select name="Profesor">
        <option selected value="">-</option>
        <option v-for="teacher in teachers" :key="teacher" :value="teacher">{{ teacher }}</option>
      </select>
    </div>
    <div>
      <label for="Cuatrimestre">Cuatrimestre</label>
      <select name="Cuatrimestre">
        <option selected value="">-</option>
        <option v-for="(semester, index) in semesters" :key="semester" :value="index">{{ semester }}</option>
      </select></div>
    <div>
      <label for="NumUnidades">Numero de unidades</label>
      <select name="NumUnidades">
        <option selected value="">-</option>
        <option v-for="unit in units" :key="unit" :value="unit">{{ unit }}</option>
      </select>
    </div>
    <div class="flex justify-center col-span-full gap-2 [&>*]:w-full">
      <div>
        <label for="Competencia">Competencia</label>
        <textarea name="Competencia" class="col-span-full"></textarea>
      </div>
      <div>
        <label for="ObjetivoGeneral">Objetivo General</label>
        <textarea name="ObjetivoGeneral" class="col-span-full"></textarea>
      </div>
    </div>
    <Button class="col-span-2" type="submit">Agregar</Button>
  </form>
</template>

<style scoped>
label {
  display: block;
  margin-bottom: 2px;
  padding-left: 0.5rem;
}

select {
  background: #fff;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: 100%;
}

select:invalid {
  color: gray;
}
textarea{
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 1rem;
  padding: 0.5rem;
  resize: vertical;
}
</style>