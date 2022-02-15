import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "hkrbackend.firebaseapp.com",
  projectId: "hkrbackend",
  storageBucket: "hkrbackend.appspot.com",
  messagingSenderId: "228302289577",
  appId: "1:228302289577:web:da71e2a926e63f289087b8",
  measurementId: "G-6T976VRMF4",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
