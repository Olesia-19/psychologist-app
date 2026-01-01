import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import type { User } from "firebase/auth";

import { auth } from "./config";

/* =====================
   Регистрация
===================== */
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });

  return userCredential.user;
};

/* =====================
   Логин
===================== */
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return userCredential.user;
};

/* =====================
   Логаут
===================== */
export const logoutUser = async () => {
  await signOut(auth);
};

/* =====================
   Слушатель авторизации
===================== */
export const subscribeToAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
