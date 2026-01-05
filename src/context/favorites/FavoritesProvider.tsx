import { useEffect, useState } from "react";
import { FavoritesContext } from "./favorites-context";
import { useAuth } from "../auth/useAuth";
import {
  getUserFavorites,
  updateUserFavorites,
} from "../../firebase/favorites";

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;

    const syncFavorites = async () => {
      if (!user) {
        if (isMounted) setFavorites([]);
        return;
      }

      const data = await getUserFavorites(user.uid);
      if (isMounted) setFavorites(data);
    };

    syncFavorites();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const toggleFavorite = async (id: string) => {
    if (!user) return;

    const updatedFavorites = favorites.includes(id)
      ? favorites.filter((favId) => favId !== id)
      : [...favorites, id];

    setFavorites(updatedFavorites);
    await updateUserFavorites(user.uid, updatedFavorites);
  };

  const isFavorite = (id: string) => {
    return favorites.includes(id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
