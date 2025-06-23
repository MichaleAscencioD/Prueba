<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div class="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button @click="cerrar" class="absolute top-2 right-2 text-gray-500 hover:text-black text-lg">×</button>

            <!-- Título dinámico -->
            <h2 class="text-xl font-bold mb-4">
                {{ esEdicion ? 'Editar Entrenamiento' : 'Agregar Entrenamiento' }}
            </h2>
            <!-- Modal de formulario -->
            <form @submit.prevent="guardar" class="form space-y-4">
                <div class="input-field">
                    <input v-model="localEntreno.titulo" type="text" required class="border w-full mb-2 p-2" />
                    <label for="Titulo">Título del entrenamiento</label>
                </div>
                <div class="input-field">
                    <input v-model="localEntreno.descripcion" type="text" required class="border w-full mb-2 p-2" />
                    <label for="Descripcion">Descripción del entrenamiento</label>
                </div>
                <div class="input-field-datos-sobrepuestos">
                    <input v-model.number="localEntreno.fecha" :min="fechaMinima" :max="fechaMaxima" type="date"
                        required class="border w-full mb-4 p-2" />
                    <label for="Fecha">Fecha del entrenamiento</label>
                </div>
                <div class="input-field-datos-sobrepuestos">
                    <input v-model="localEntreno.duracion" type="number" required class="border w-full mb-2 p-2" min=0
                        max=300 />
                    <label for="Tiempo">Duración del entrenamiento (Minutos)</label>
                </div>
                <div class="input-field-datos-sobrepuestos">
                    <input v-model="localEntreno.distancia" type="number" step="0.001" min=0 required
                        class="border w-full mb-2 p-2" />
                    <label for="Distancia">Distancia del entrenamiento (Kilometros)</label>
                </div>
                <div class="flex justify-between">
                    <button type="submit"
                        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Guardar</button>
                    <button type="button" @click="cerrar" class="bg-gray-300 px-4 py-2 rounded">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import type { Entrenamiento } from '../models/Entrenamiento'

const fechaMaxima = ref('')
const fechaMinima = ref('')
const fechaSeleccionada = ref('')

//Constante para fecha máxima y fecha minima
onMounted(() => {
    const hoy = new Date()
    const yyyy = hoy.getFullYear()
    const mm = String(hoy.getMonth() + 1).padStart(2, '0')
    const dd = String(hoy.getDate()).padStart(2, '0')

    fechaMinima.value = '2020-01-01'
    fechaMaxima.value = `${yyyy}-${mm}-${dd}`
})

const props = defineProps<{
    visible: boolean
    index: number | null
    entrenamiento: Entrenamiento | null
}>()

const emits = defineEmits(['close', 'update', 'create'])

const localEntreno = ref<Entrenamiento>({
    titulo: '',
    descripcion: '',
    fecha: '',
    duracion: 0,
    distancia: 0,
})

// Cargar entrenamiento en edición
watch(() => props.entrenamiento, (nuevo) => {
    if (nuevo) {
        localEntreno.value = { ...nuevo }
    } else {
        localEntreno.value = {
            titulo: '',
            descripcion: '',
            fecha: '',
            duracion: 0,
            distancia: 0,
        }
    }
})

// ¿Estamos editando?
const esEdicion = computed(() => props.index !== null && props.index >= 0)

const cerrar = () => {
    emits('close')
}

const guardar = () => {
    localEntreno.value.fecha = fechaSeleccionada.value
    
    if (esEdicion.value && props.index !== null) {
        emits('update', props.index, localEntreno.value)
    } else {
        emits('create', localEntreno.value)
    }
    cerrar()
}
</script>
