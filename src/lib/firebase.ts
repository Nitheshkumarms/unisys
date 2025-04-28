import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged,  // Add this import
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { 
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVtEOLRN2oYKW-2yN3M0bas9-HsZV4dA4",
  authDomain: "scm-unisys.firebaseapp.com",
  projectId: "scm-unisys",
  storageBucket: "scm-unisys.appspot.com",
  messagingSenderId: "450884000463",
  appId: "1:450884000463:android:188830021831c02b5875ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export all auth-related functions
export {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  browserLocalPersistence,
  // Firestore methods
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
};

export type { User };