<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <ConfirmModal :visible="modalConfirmVisible" :mensaje="mensajeConfirmacion" @confirmar="confirmarEliminacion"
      @cancelar="cancelarEliminacion" />
    <h1 class="text-4xl font-bold text-blue-600 text-align-center">Bienvenido a Entrenamientos</h1>

    <div class="my-6 flex justify-center">
      <button @click="abrirModalEdicion(null)" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Agregar entrenamiento
      </button>
    </div>

    <h2 class="text-xl font-bold mb-4">Historial de Entrenamientos</h2>

    <!-- Mostrar mientras carga -->
    <div v-if="cargando" class="text-gray-500">Cargando entrenamientos...</div>

    <!-- Mostrar si no hay entrenamientos -->
    <div v-else-if="entrenamientos.length === 0" class="text-gray-500">No hay datos para mostrar</div>

    <!-- Mostrar los entrenamientos -->
    <div v-else class="cards">
      <div v-for="entreno in entrenamientosOrdenados" :key="entreno.id" class="card"
        :class="getColorClass(entreno.duracion)">
        <p class="tip">{{ entreno.titulo }}</p>
        <p class="second-text">{{ entreno.descripcion }} ({{ entreno.duracion }} min)</p>
        <p class="second-text text-sm">{{ entreno.fecha }}</p>
        <div class="mt-2 flex gap-2">
          <button @click="entreno.id && abrirModalEdicion(entreno.id)"
            class="bg-white text-black text-xs px-2 py-1 rounded">
            Editar
          </button>
          <button @click="solicitarEliminacion(entreno)" class="bg-white text-black text-xs px-2 py-1 rounded">
            Eliminar
          </button>

        </div>
      </div>
    </div>


    <EntrenamientoModal :visible="modalVisible" :id="editId" :entrenamiento="entrenamientoSeleccionado"
      @close="cerrarModal" @update="editarEntrenamientoPorId" @create="crearEntrenamiento" />
  </div>

</template>


<script setup lang="ts">

import ConfirmModal from './ConfirmModal.vue'
import { onMounted, ref, computed } from 'vue'
import {
  entrenamientos,
  crearEntrenamiento,
  editarEntrenamiento,
  borrarEntrenamiento,
  cargarEntrenamientos
} from '../controllers/entrenamientoController'



import type { Entrenamiento } from '../models/Entrenamiento'
import EntrenamientoModal from './EntrenamientoModal.vue'

const modalVisible = ref(false)
const editId = ref<string | null>(null)

const modalConfirmVisible = ref(false)
const mensajeConfirmacion = ref('')
const idAEliminar = ref<string | null>(null)

const solicitarEliminacion = (entreno: Entrenamiento) => {
  mensajeConfirmacion.value = `¿Estás seguro que quieres eliminar el entrenamiento "${entreno.titulo}"?`
  idAEliminar.value = entreno.id ?? null
  modalConfirmVisible.value = true
}

const confirmarEliminacion = () => {
  if (idAEliminar.value) {
    borrarEntrenamientoPorId(idAEliminar.value)
  }
  modalConfirmVisible.value = false
  idAEliminar.value = null
}

const cancelarEliminacion = () => {
  modalConfirmVisible.value = false
  idAEliminar.value = null
}

const entrenamientoSeleccionado = computed(() =>
  editId.value ? entrenamientos.value.find(e => e.id === editId.value) ?? null : null
)

const abrirModalEdicion = (id: string | null) => {
  editId.value = id
  modalVisible.value = true
}

const cerrarModal = () => {
  modalVisible.value = false
  editId.value = null
}

const editarEntrenamientoPorId = async (id: string, actualizado: Entrenamiento) => {
  await editarEntrenamiento(id, actualizado)
}

const borrarEntrenamientoPorId = async (id: string) => {
  await borrarEntrenamiento(id)
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

const cargando = ref(true)

onMounted(async () => {
  cargando.value = true
  await cargarEntrenamientos()
  cargando.value = false
})


</script>
