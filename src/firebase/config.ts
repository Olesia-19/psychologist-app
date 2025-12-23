import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA-Eg7ygAnZjACN6t_wID_GMgwqaWGyjn8",
  authDomain: "psychologist-app-8e381.firebaseapp.com",
  projectId: "psychologist-app-8e381",
  storageBucket: "psychologist-app-8e381.firebasestorage.app",
  messagingSenderId: "883137569006",
  appId: "1:883137569006:web:33989c9d8a26c7dfa153ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
