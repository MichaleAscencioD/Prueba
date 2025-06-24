import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAysVIfkpGdg7ZingtSCKSuTPt0jPH_00s",
  authDomain: "prueba-8aa3a.firebaseapp.com",
  projectId: "prueba-8aa3a",
  storageBucket: "prueba-8aa3a.firebasestorage.app",
  messagingSenderId: "144008708672",
  appId: "1:144008708672:web:07cb2d38bc0a986dfad5a5",
  measurementId: "G-6BXKTHVEJ3"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
