import { ref, get, set } from "firebase/database";
import { db } from "./config";

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  const favoritesRef = ref(db, `users/${userId}/favorites`);
  const snapshot = await get(favoritesRef);

  if (!snapshot.exists()) {
    return [];
  }

  return Object.keys(snapshot.val());
};

export const updateUserFavorites = async (
  userId: string,
  favorites: string[]
): Promise<void> => {
  const favoritesRef = ref(db, `users/${userId}/favorites`);
  const favoritesObject = favorites.reduce<Record<string, true>>((acc, id) => {
    acc[id] = true;
    return acc;
  }, {});

  await set(favoritesRef, favoritesObject);
};
