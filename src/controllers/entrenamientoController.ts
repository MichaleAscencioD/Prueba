import { ref } from 'vue'
import type { Entrenamiento } from '../models/Entrenamiento'

export const entrenamientos = ref<Entrenamiento[]>([
  { id: '1', titulo: 'Cardio Rápido', descripcion: 'Alta intensidad', fecha: '02-02-2002', duracion: 85, distancia: 100 },
  { id: '2', titulo: 'Resistencia', descripcion: 'Mediana intensidad', fecha: '03-02-2002', duracion: 120, distancia: 100 },
  { id: '3', titulo: 'Maraton', descripcion: 'Baja intensidad', fecha: '04-02-2002', duracion: 200, distancia: 100 },
])

export const eliminarEntrenamiento = (index: number) => {
  entrenamientos.value.splice(index, 1)
}

export const actualizarEntrenamiento = (index: number, nuevo: Entrenamiento) => {
  entrenamientos.value[index] = nuevo
}