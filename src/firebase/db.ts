import { ref, set, onValue } from "firebase/database";
import { db } from "./config";

/* =====================
   Тип пользователя
===================== */
export type UserProfile = {
  email: string;
  createdAt: number;
};

/* =====================
   Сохранить пользователя
===================== */
export const saveUserProfile = async (uid: string, data: UserProfile) => {
  await set(ref(db, `users/${uid}`), data);
};

/* =====================
   Подписка на пользователя (realtime)
===================== */
export const subscribeToUserProfile = (
  uid: string,
  callback: (data: UserProfile | null) => void
) => {
  const userRef = ref(db, `users/${uid}`);

  return onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};
