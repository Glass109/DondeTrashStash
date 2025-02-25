<script setup lang="ts">
import type {Asignatura, UnidadDeAprendizaje} from "~/lib/types";
import {useToast} from "~/components/ui/toast";
import NewUnidadForm from "~/components/panel-maestros/new-unidad-form.vue";

const cuatrimestres = ['1er', '2do', '3ero', '4to', '5to', '6to', '7mo', '8vo', '9no', '10mo']
const showCreateUnidadDialog = ref<boolean>(false)
const {toast} = useToast()
const props = defineProps<{
  asignatura: Asignatura
}>()
const conocimientoTotal = computed(() =>
  props.asignatura.Unidades!.reduce((total: number, uint: UnidadDeAprendizaje) => total + uint.Conocimiento, 0)
)

const desempenoTotal = computed(() =>
  props.asignatura.Unidades!.reduce((total: number, uint: UnidadDeAprendizaje) => total + uint.Desempeño, 0)
)
</script>

<template>
  <div>

    <table>
      <tbody>
      <tr>
        <th><strong>ASIGNATURA:</strong></th>
        <td>{{ asignatura.Nombre }}</td>
        <th><strong>FAMILIA:</strong></th>
        <td>{{ asignatura.Familia }}</td>
        <th><strong>DURACIÓN:</strong></th>
        <td>{{ asignatura.Duracion }}</td>
      </tr>
      <tr>
        <th><strong>CUATRIMESTRE:</strong></th>
        <td>{{ cuatrimestres[asignatura.Cuatrimestre - 1] }}</td>
        <th><strong>PROFESOR:</strong></th>
        <td colspan="3">{{ asignatura.Profesor }}</td>
      </tr>
      <tr>
        <th><strong>COMPETENCIA:</strong></th>
        <td colspan="5">{{ asignatura.Competencia }}</td>
      </tr>
      <tr>
        <th><strong>OBJETIVO GENERAL ASIGNATURA:</strong></th>
        <td colspan="5">{{ asignatura.ObjetivoGeneral }}</td>
      </tr>
      </tbody>
    </table>
    <separator decorative class="my-2"/>
    <table>
      <thead>
      <tr>
        <th rowspan="2">*U.A.</th>
        <th rowspan="2">Competencia Específica por UA</th>
        <th rowspan="2">Num. Semanas</th>
        <th rowspan="2">Resultado de Aprendizaje (P)</th>
        <th rowspan="2">**TI (sí/no)</th>
        <th colspan="2">Ponderación para EVALUACIÓN</th>
      </tr>
      <tr>
        <th>SABER (C)</th>
        <th>HACER+SER (D)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="unit in asignatura.Unidades">
        <td>{{ unit.Nombre }}</td>
        <td>{{ unit.Competencia }}</td>
        <td>{{ unit.Semanas }}</td>
        <td>{{ unit.Producto }}</td>
        <td>{{ unit.TareaIntegradora ? 'Si' : 'No' }}</td>
        <td>{{ unit.Conocimiento }}</td>
        <td>{{ unit.Desempeño }}</td>
      </tr>
      <tr @click="showCreateUnidadDialog = !showCreateUnidadDialog">
        <td colspan="7" class="text-center cursor-pointer hover:bg-green-100 hover:font-bold">
        <span>
          <Icon name="line-md:document-add"/>
          </span>
          <span>Agregar unidad</span>
        </td>
      </tr>
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td><strong>{{
            asignatura.Unidades!.reduce((total: number, unit: UnidadDeAprendizaje) => total + unit.Semanas, 0)
          }}</strong></td>
        <td colspan="2"></td>
        <td><strong :class="{ 'text-red-500': conocimientoTotal > 100 }">{{
            conocimientoTotal
          }}%</strong>
        </td>
        <td><strong :class="{ 'text-red-500': desempenoTotal > 100 }">{{
            desempenoTotal
          }}%</strong></td>
      </tr>
      </tbody>
    </table>
    <Dialog v-model:open="showCreateUnidadDialog">
      <DialogContent>
        <new-unidad-form :asignatura-id="asignatura.ID!"/>
      </DialogContent>
    </Dialog>
  </div>

</template>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border: solid black 1px;
  @apply rounded-md
}


th {
  background-color: #eeeeee;
  border-top: none;
}

td:first-child, th:first-child {
  border-left: none;
}

tr {
  @apply hover:bg-gray-100 cursor-pointer
}

dialog {
  @apply border border-black rounded-lg shadow shadow-black p-4 fixed inset-0 bg-white
}
</style>