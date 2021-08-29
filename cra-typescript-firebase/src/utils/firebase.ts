import { FirebaseApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

// copy these from Firebase project settings
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}

export let db: firebase.firestore.Firestore
export let firebaseApp: FirebaseApp

export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebaseApp = firebase.initializeApp(firebaseConfig)

    db = firebase.firestore()
  } else {
    firebaseApp = firebase.app()
  }
}
