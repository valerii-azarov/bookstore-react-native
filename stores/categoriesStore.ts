import { create } from "zustand";
import { categoriesApi } from "@/api/categoriesApi";
import { favoritesApi } from "@/api/favoritesApi";
import { genresKeys } from "@/constants/book";
import { bookHandler } from "@/helpers/bookHandler";
import { CategoriesType, CategoriesStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useFavoritesStore } from "./favoritesStore";

interface CategoriesStore {
  categories: CategoriesType;
  categoriesStatus: CategoriesStatusType;
  categoriesResponse: ResponseType | null;
  loadCategories: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

export const useCategoriesStore = create<CategoriesStore>((set, get) => ({
  categories: {},
  categoriesStatus: "idle",
  categoriesResponse: null,

  loadCategories: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ categoriesStatus: "loading" });

    const favoriteIds = await favoritesApi.getFavoriteIds(userId);
    useFavoritesStore.setState({ favoriteIds });

    categoriesApi.fetchAllCategories(genresKeys)
      .then((categories) => {
        set({
          categories: Object.fromEntries(
            Object.entries(categories).map(([key, books]) => [key, bookHandler.addIsFavoriteFlag(books, favoriteIds)])
          ),
          categoriesResponse: { status: "success" },
          categoriesStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          categories: {},
          categoriesResponse: { status: "error", message: error.message },
          categoriesStatus: "idle",
        })
      );
  },

  refreshCategories: async () => {
    const { categoriesStatus } = get();

    if (categoriesStatus === "refreshing") return;

    set({ categoriesStatus: "refreshing", categoriesResponse: null });
    get().loadCategories();
  },

}));

useFavoritesStore.subscribe((state) => {
  const { categories } = useCategoriesStore.getState();
  
  if (Object.keys(categories).length > 0) {
    useCategoriesStore.setState({
      categories: Object.fromEntries(
        Object.entries(categories).map(([key, books]) => [key, bookHandler.addIsFavoriteFlag(books, state.favoriteIds)])
      ),
    });
  }
});
