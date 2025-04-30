import { create } from "zustand";
import { favoritesApi } from "@/api/favoritesApi";
import { bookHandler } from "@/helpers/bookHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Favorite, FavoriteStatusType, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface FavoritesStore {
  favoriteIds: string[];
  favoriteBooks: Favorite[];
  favoriteStatus: StatusType;
  favoriteResponse: ResponseType | null;
  toggleFavoriteStatus: FavoriteStatusType;
  toggleFavoriteResponse: ResponseType | null;
  favoritesDataLoaded: boolean;
  initializeFavorites: () => Promise<void>;
  loadFavoriteBooks: () => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
  resetFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  favoriteBooks: [],
  favoriteStatus: "idle",
  favoriteResponse: null,
  toggleFavoriteStatus: "idle",
  toggleFavoriteResponse: null,
  favoritesDataLoaded: false,

  initializeFavorites: async () => {
    if (get().favoritesDataLoaded) return;

    const userId = useAuthStore.getState().user?.uid;
    if (!userId) {
      set({ favoritesDataLoaded: true });
      return;
    }

    favoritesApi
      .getFavoriteIds(userId)
      .then((favoriteIds) => 
        set({ 
          favoriteIds: favoriteIds || [], 
          favoritesDataLoaded: true,
        })
      )
      .catch((error) => {
        console.error("Error loading favorite IDs:", error);
        set({ favoritesDataLoaded: true });
      });
  },

  loadFavoriteBooks: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ favoriteStatus: "loading", favoriteResponse: null });

    const favoriteIds = get().favoriteIds;

    favoritesApi.getFavoriteBooks(userId)
      .then((favoriteBooks) => {
        const booksWithFavorite = bookHandler.addIsFavoriteFlag(favoriteBooks, favoriteIds);

        set({
          favoriteBooks: booksWithFavorite.length > 0 ? booksWithFavorite : [],
          favoriteResponse: { status: "success" },
          favoriteStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          favoriteResponse: { status: "error", message: error.message },
          favoriteStatus: "idle",
        })
      );
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
          toggleFavoriteStatus: "idle",
        });
        setTimeout(() => set({ toggleFavoriteResponse: null }), 3000);
      })
      .catch((error) => {
        set({
          toggleFavoriteResponse: { status: "error", message: error.message },
          toggleFavoriteStatus: "idle",
        });
        setTimeout(() => set({ toggleFavoriteResponse: null }), 3000);
      });
  },

  resetFavorites: () => {
    set({
      favoriteBooks: [],
      favoriteStatus: "idle",
      favoriteResponse: null,
    });
  },

}));

useFavoritesStore.subscribe((state, prevState) => {
  if (state.favoriteIds !== prevState.favoriteIds && state.favoriteBooks.length > 0) {
    const updatedBooks = bookHandler.addIsFavoriteFlag(state.favoriteBooks, state.favoriteIds);
    useFavoritesStore.setState({ favoriteBooks: updatedBooks });
  }
});
