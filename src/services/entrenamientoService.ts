import { db } from '../firebase/config'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import type { Entrenamiento } from '../models/Entrenamiento'

const collectionRef = collection(db, 'entrenamientos')

export const agregarEntrenamiento = async (entrenamiento: Entrenamiento) => {
  await addDoc(collectionRef, entrenamiento)
}

export const obtenerEntrenamientos = async (): Promise<Entrenamiento[]> => {
  const snapshot = await getDocs(collection(db, 'entrenamientos'))
  const entrenamientos: Entrenamiento[] = []
  snapshot.forEach(doc => {
    const data = doc.data()
    entrenamientos.push({
      id: doc.id,
      titulo: data.titulo,
      descripcion: data.descripcion,
      fecha: data.fecha,
      duracion: data.duracion,
      distancia: data.distancia
    })
  })
  return entrenamientos
}

export const actualizarEntrenamiento = async (id: string, data: Entrenamiento) => {
  const docRef = doc(db, 'entrenamientos', id)
  
  // Excluir el campo `id` del objeto antes de actualizar
  const { id: _omit, ...dataSinId } = data

  await updateDoc(docRef, dataSinId)
}

export const eliminarEntrenamiento = async (id: string) => {
  const docRef = doc(db, 'entrenamientos', id)
  await deleteDoc(docRef)
}
