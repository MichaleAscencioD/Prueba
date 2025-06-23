<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold text-blue-600 text-align-center">Bienvenido a Entrenamientos</h1>

    <div class="my-6 flex justify-center">
      <button @click="abrirModalEdicion(-1)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Agregar entrenamiento
      </button>

    </div>

    <h2 class="text-xl font-bold mb-4">Historial de Entrenamiento</h2>
    <div v-if="entrenamientos.length === 0" class="text-gray-500">No hay datos para mostrar</div>

    <div class="cards">
      <div v-for="(entreno, index) in entrenamientosOrdenados" :key="index" class="card" :class="getColorClass(entreno.duracion)">
        <p class="tip">{{ entreno.titulo }}</p>
        <p class="second-text">{{ entreno.descripcion }} ({{ entreno.duracion }} min)</p>
        <div class="mt-2 flex gap-2">
          <button @click="abrirModalEdicion(index)" class="bg-white text-black text-xs px-2 py-1 rounded">Editar</button>
          <button @click="eliminarEntrenamiento(index)" class="bg-white text-black text-xs px-2 py-1 rounded">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <EntrenamientoModal
      :visible="modalVisible"
      :index="editIndex"
      :entrenamiento="entrenamientoSeleccionado"
      @close="cerrarModal"
      @update="actualizarEntrenamiento"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { entrenamientos, eliminarEntrenamiento, actualizarEntrenamiento } from '../controllers/entrenamientoController'
import type { Entrenamiento } from '../models/Entrenamiento'
import EntrenamientoModal from './EntrenamientoModal.vue'

const modalVisible = ref(false)
const editIndex = ref<number | null>(null)

const entrenamientoSeleccionado = computed(() =>
  editIndex.value !== null && editIndex.value >= 0 ? entrenamientos.value[editIndex.value] : null
)


const abrirModalEdicion = (index: number) => {
  editIndex.value = index
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  editIndex.value = null
}

const getColorClass = (tiempo: number): string => {
  if (tiempo >= 200) return 'green'
  if (tiempo >= 100) return 'blue'
  return 'red'
}

const entrenamientosOrdenados = computed(() => {
  return [...entrenamientos.value].sort((a, b) => {
    return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  })
})


</script>
