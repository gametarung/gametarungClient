import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: `AIzaSyBKrhAEGgNnDDFaA_dMFQ-S4YgKBcwNfV8`,
  authDomain: `werefox-191903.firebaseapp.com`,
  databaseURL: `https://werefox-191903.firebaseio.com`,
  projectId: `werefox-191903`,
  storageBucket: ``,
  messagingSenderId: `995380116138`
})

export const db = app.database()
export const charRefs = db.ref('characters')
export const questionRefs = db.ref('questions')
export const userRefs = db.ref('users')
export const roomRefs = db.ref('rooms')
