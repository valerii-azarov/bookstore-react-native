import { create } from "zustand";
import { categoriesApi } from "@/api/categoriesApi";
import { genresKeys } from "@/constants/book";
import { bookHandler } from "@/helpers/bookHandler";
import { Book, StatusType, ResponseType } from "@/types";

type CategoriesType = { [key: string]: Book[] };

import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
import { useFavoritesStore } from "./favoritesStore";

interface CategoriesStore {
  categories: CategoriesType;
  categoriesStatus: StatusType;
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

    set({ categoriesStatus: "loading", categoriesResponse: null });

    const { cartBooks } = useCartStore.getState();
    const { favoriteIds } = useFavoritesStore.getState();

    categoriesApi
      .fetchAllCategories(genresKeys)
      .then((categories) => {
        const categoriesWithFlags = Object.fromEntries(
          Object.entries(categories).map(([key, books]) => [
            key,
            bookHandler.addFavoriteAndCartFlags(books, cartBooks, favoriteIds),
          ])
        );
        set({
          categories: Object.keys(categoriesWithFlags).length > 0 ? categoriesWithFlags : {},
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
    get().loadCategories();
  },

}));

useCartStore.subscribe((state) => {
  const { categories } = useCategoriesStore.getState();
  
  if (Object.keys(categories).length > 0) {
    useCategoriesStore.setState({
      categories: Object.fromEntries(
        Object.entries(categories).map(([key, books]) => [key, bookHandler.addInCartFlag(books, state.cartBooks)])
      ),
    });
  }
});

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
