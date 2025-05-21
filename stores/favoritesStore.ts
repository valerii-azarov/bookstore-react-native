import { create } from "zustand";
import { favoritesApi } from "@/api/favoritesApi";
import { bookHandler } from "@/helpers/bookHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Favorite, FavoriteStatusType, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

type FavoritesOperation = "fetch" | "toggle";

type FavoritesOperationState = {
  status: StatusType | FavoriteStatusType;
  response: ResponseType | null;
};

interface FavoritesStore {
  favoriteIds: string[];
  favoriteBooks: Favorite[];
  favoritesDataLoaded: boolean;
  favoritesOperations: Record<FavoritesOperation, FavoritesOperationState>;
  initializeFavorites: () => Promise<void>;
  loadFavoriteBooks: () => Promise<void>;
  toggleFavorite: (bookId: string) => Promise<void>;
  setFavoritesOperationState: (op: FavoritesOperation, state: Partial<FavoritesOperationState>) => void;
  resetFavoritesOperationState: (op: FavoritesOperation) => void;
  resetFavorites: () => void;
  resetAll: () => void;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],
  favoriteBooks: [],
  favoritesDataLoaded: false,
  favoritesOperations: {
    fetch: { status: "idle", response: null },
    toggle: { status: "idle", response: null },
  },

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

    set((state) => ({
      favoritesOperations: {
        ...state.favoritesOperations,
        fetch: { status: "loading", response: null },
      },
    }));

    const favoriteIds = get().favoriteIds;

    favoritesApi.getFavoriteBooks(userId)
      .then((favoriteBooks) => {
        const booksWithFavorite = bookHandler.addIsFavoriteFlag(favoriteBooks, favoriteIds);

        set((state) => ({
          favoriteBooks: booksWithFavorite.length > 0 ? booksWithFavorite : [],
          favoritesOperations: {
            ...state.favoritesOperations,
            fetch: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
      })
      .catch((error) =>
        set((state) => ({
          favoritesOperations: {
            ...state.favoritesOperations,
            fetch: {
              status: "idle",
              response: { status: "error", message: error.message },
            },
          },
        }))
      );
  },

  toggleFavorite: async (bookId: string) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set((state) => ({
      favoritesOperations: {
        ...state.favoritesOperations,
        toggle: { status: "toggling", response: null },
      },
    }));

    const { favoriteIds } = get();
    const isFavorite = favoriteIds.includes(bookId);
    const newFavoriteIds = isFavorite ? favoriteIds.filter((id) => id !== bookId) : [...favoriteIds, bookId];

    set({ favoriteIds: newFavoriteIds });

    const fetchMethod = isFavorite
      ? favoritesApi.removeFromFavorites(userId, bookId)
      : favoritesApi.addToFavorites(userId, bookId);

    fetchMethod
      .then(() => {
        set((state) => ({
          favoritesOperations: {
            ...state.favoritesOperations,
            toggle: { 
              status: "idle", 
              response: {
                status: "success",
                message: messageHandler.getSuccessMessage(
                  isFavorite ? "removed" : "added", 
                  {
                    "added": "favorites.bookAddedToFavorites",
                    "removed": "favorites.bookRemovedFromFavorites",
                  }
                ),
              },
            },
          },
        }));

        setTimeout(() => {
          set((state) => ({
            favoritesOperations: {
              ...state.favoritesOperations,
              toggle: { status: "idle", response: null },
            },
          }));
        }, 3000);
      })
      .catch((error) => {
        set((state) => ({
          favoritesOperations: {
            ...state.favoritesOperations,
            toggle: {
              status: "idle",
              response: { status: "error", message: error.message },
            },
          },
        }));

        setTimeout(() => {
          set((state) => ({
            favoritesOperations: {
              ...state.favoritesOperations,
              toggle: { status: "idle", response: null },
            },
          }));
        }, 3000);
      });
  },

  setFavoritesOperationState: (op, stateUpdate) => {
    set((state) => ({
      favoritesOperations: {
        ...state.favoritesOperations,
        [op]: { ...state.favoritesOperations[op], ...stateUpdate },
      },
    }));
  },
  
  resetFavoritesOperationState: (op) => {
    set((state) => ({
      favoritesOperations: {
        ...state.favoritesOperations,
        [op]: { status: "idle", response: null },
      },
    }));
  },

  resetFavorites: () => {
    set((state) => ({
      favoriteBooks: [],
      favoritesOperations: {
        ...state.favoritesOperations,
        fetch: { status: "idle", response: null },
      },
    }));
  },

  resetAll: () => {
    set({
      favoriteIds: [],
      favoriteBooks: [],
      favoritesDataLoaded: false,
      favoritesOperations: {
        fetch: { status: "idle", response: null },
        toggle: { status: "idle", response: null },
      },
    });
  },

}));

useFavoritesStore.subscribe((state, prevState) => {
  if (state.favoriteIds !== prevState.favoriteIds && state.favoriteBooks.length > 0) {
    const updatedBooks = bookHandler.addIsFavoriteFlag(state.favoriteBooks, state.favoriteIds);
    useFavoritesStore.setState({ favoriteBooks: updatedBooks });
  }
});
