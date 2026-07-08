import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore/lite";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

// Check if Firebase configuration keys are provided
export const isFirebaseEnabled = !!apiKey;

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let googleProvider: GoogleAuthProvider | null = null;

if (isFirebaseEnabled) {
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
}

export { app, db, auth, googleProvider };
export default app;
