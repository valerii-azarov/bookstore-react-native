import { create } from "zustand";
import { favoritesApi } from "@/api/favoritesApi";
import { messageHandler } from "@/helpers/messageHandler";
import { BaseBook, FavoritesStatusType, ToggleFavoriteStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface FavoritesStore {
  favoriteIds: string[];
  favoriteBooks: BaseBook[];
  favoriteStatus: FavoritesStatusType;
  favoriteResponse: ResponseType | null;
  toggleFavoriteStatus: ToggleFavoriteStatusType;
  toggleFavoriteResponse: ResponseType | null;
  setFavoriteIds: (ids: string[]) => void;
  loadFavoriteBooks: () => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  favoriteBooks: [],
  favoriteStatus: "idle",
  favoriteResponse: null,
  toggleFavoriteStatus: "idle",
  toggleFavoriteResponse: null,

  setFavoriteIds: (ids: string[]) => set({ favoriteIds: ids }),

  loadFavoriteBooks: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ favoriteStatus: "loading", favoriteResponse: null });

    favoritesApi.getFavoriteBooks(userId)
      .then((favoriteBooks) =>
        set({
          favoriteBooks: favoriteBooks.length > 0 ? favoriteBooks : [],
          favoriteResponse: { status: "success" },
        })
      )
      .catch((error) =>
        set({
          favoriteResponse: { status: "error", message: error.message },
        })
      )
      .finally(() => set({ favoriteStatus: "idle" }));
  },

  toggleFavorite: async (bookId: string) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ toggleFavoriteStatus: "toggling", toggleFavoriteResponse: null });

    const { favoriteIds } = get();
    const isFavorite = favoriteIds.includes(bookId);
    const newFavoriteIds = isFavorite ? favoriteIds.filter((id) => id !== bookId) : [...favoriteIds, bookId];

    set({ favoriteIds: newFavoriteIds });

    const fetchMethod = isFavorite
      ? favoritesApi.removeFromFavorites(userId, bookId)
      : favoritesApi.addToFavorites(userId, bookId);

    fetchMethod
      .then(() => {
        set({
          toggleFavoriteResponse: {
            status: "success",
            message: messageHandler.getSuccessMessage(isFavorite ? "removed" : "added", {
              "added": "favorites.bookAddedToFavorites",
              "removed": "favorites.bookRemovedFromFavorites",
            }),
          },
        });
        setTimeout(() => set({ toggleFavoriteResponse: null }), 3000);
      })
      .catch((error) => {
        set({
          toggleFavoriteResponse: { status: "error", message: error.message },
        });
        setTimeout(() => set({ toggleFavoriteResponse: null }), 3000);
      })
      .finally(() => set({ toggleFavoriteStatus: "idle" }));
  },

}));
