<script setup lang="ts">

import SumaNumeros from "~/components/practica-examen-norma/SumaNumeros.vue";
import ContarCaracteres from "~/components/practica-examen-norma/ContarCaracteres.vue";
import RevertirTexto from "~/components/practica-examen-norma/RevertirTexto.vue";
import ContarVocales from "~/components/practica-examen-norma/ContarVocales.vue";
</script>

<template>
  <main class="mainpage gradient-background">
    <div class="container mx-auto grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Actividad #1</CardTitle>
        </CardHeader>
        <CardContent>
          <SumaNumeros/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividad #2</CardTitle>
        </CardHeader>
        <CardContent>
          <ContarCaracteres/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividad #3</CardTitle>
        </CardHeader>
        <CardContent>
          <RevertirTexto/>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Actividad #4</CardTitle>
        </CardHeader>
        <CardContent>
          <ContarVocales/>
        </CardContent>
      </Card>


    </div>

  </main>
</template>

<style scoped>

</style>