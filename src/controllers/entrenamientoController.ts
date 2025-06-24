import { ref, onMounted } from 'vue'
import type { Entrenamiento } from '../models/Entrenamiento'
import {
  agregarEntrenamiento as agregarFirestore,
  obtenerEntrenamientos,
  actualizarEntrenamiento as actualizarFirestore,
  eliminarEntrenamiento as eliminarFirestore
} from '../services/entrenamientoService'

export const entrenamientos = ref<Entrenamiento[]>([])

onMounted(async () => {
  entrenamientos.value = await obtenerEntrenamientos()
})

//Función auxiliar para generar el siguiente ID numérico como string
const generarIdSecuencial = (): string => {
  const ids = entrenamientos.value
    .map(e => Number(e.id))
    .filter(id => !isNaN(id))

  const maxId = ids.length ? Math.max(...ids) : 0
  return String(maxId + 1)
}

export const crearEntrenamiento = async (nuevo: Entrenamiento) => {
  const nuevoConId: Entrenamiento = {
    ...nuevo,
    id: generarIdSecuencial()
  }

  await agregarFirestore(nuevoConId)
  entrenamientos.value = await obtenerEntrenamientos()
}

export const editarEntrenamiento = async (id: string, actualizado: Entrenamiento) => {
  await actualizarFirestore(id, actualizado)
  entrenamientos.value = await obtenerEntrenamientos()
}

export const borrarEntrenamiento = async (id: string) => {
  await eliminarFirestore(id)
  entrenamientos.value = await obtenerEntrenamientos()
}

export const cargarEntrenamientos = async () => {
  entrenamientos.value = await obtenerEntrenamientos()
}
