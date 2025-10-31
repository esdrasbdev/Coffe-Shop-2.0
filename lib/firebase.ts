import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getAuth, type Auth } from "firebase/auth"

const isFirebaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
)

const firebaseConfig = {
  apiKey: "AIzaSyA0GgpipLRJmBHA-8ne7G5waIqSvFoU2hI",
  authDomain: "coffee-shop-853a0.firebaseapp.com",
  projectId: "coffee-shop-853a0",
  storageBucket: "coffee-shop-853a0.firebasestorage.app",
  messagingSenderId: "236730859619",
  appId: "1:236730859619:web:d07192eeab2e76b734b856"
};

let app: FirebaseApp | null = null
let db: Firestore | null = null
let auth: Auth | null = null

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
    db = getFirestore(app)
    auth = getAuth(app)
  } catch (error) {
    console.warn("Firebase initialization failed:", error)
  }
}

export { app, db, auth, isFirebaseConfigured }
