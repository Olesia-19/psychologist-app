import { ref, set, get, onValue } from "firebase/database";
import { db } from "./config";
import type { PsychologistWithId } from "../types/psychologist";

export type UserProfile = {
  email: string;
  createdAt: number;
};

export const saveUserProfile = async (uid: string, data: UserProfile) => {
  await set(ref(db, `users/${uid}`), data);
};

export const subscribeToUserProfile = (
  uid: string,
  callback: (data: UserProfile | null) => void
) => {
  const userRef = ref(db, `users/${uid}`);

  return onValue(userRef, (snapshot) => {
    callback(snapshot.val());
  });
};

export const getPsychologists = async () => {
  const snapshot = await get(ref(db, "psychologists"));

  if (!snapshot.exists()) {
    return [];
  }

  return Object.entries(snapshot.val()).map(([id, value]) => ({
    id,
    ...(value as Omit<PsychologistWithId, "id">),
  }));
};
