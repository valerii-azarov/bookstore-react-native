import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { categoryBooksApi } from "@/api/categoryBooksApi";
import { DEFAULT_BOOKS_LIMIT } from "@/constants/settings";
import { bookHandler } from "@/helpers/bookHandler";
import { Book, StatusType, ResponseType } from "@/types";

import { useCartStore } from "./cartStore";
import { useFavoritesStore } from "./favoritesStore";

interface CategoryBooksStore {
  currentCategory: string;
  categoryBooks: Book[];
  categoryLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  categoryStatus: StatusType;
  categoryResponse: ResponseType | null;
  categoryHasMore: boolean;
  setCategory: (title: string) => void;
  loadCategoryBooks: (reset?: boolean) => Promise<void>;
  loadMoreCategoryBooks: () => void;
  refreshCategoryBooks: () => void;
  resetCategory: () => void;
}

export const useCategoryBooksStore = create<CategoryBooksStore>((set, get) => ({
  currentCategory: "",
  categoryBooks: [],
  categoryLastDoc: null,
  categoryStatus: "idle",
  categoryResponse: null,
  categoryHasMore: false,

  setCategory: (title: string) => {
    set({ currentCategory: title });
  },

  loadCategoryBooks: async (reset = false) => {
    if (get().categoryStatus === "fetching" || get().categoryStatus === "loading") return;

    set({
      categoryStatus: reset ? "loading" : "fetching",
      categoryResponse: null,
      ...(reset && { 
        categoryBooks: [],
        categoryLastDoc: null, 
        categoryHasMore: false
      }),
    });

    const { cartBooks } = useCartStore.getState();
    const { favoriteIds } = useFavoritesStore.getState();
    
    categoryBooksApi
      .fetchBooksByCategory(
        get().currentCategory,
        reset ? null : get().categoryLastDoc,
        DEFAULT_BOOKS_LIMIT
      )
      .then(({ books: newCategoryBooks, lastDoc: newLastDoc }) => {
        const categoryBooksWithFlags = bookHandler.addFavoriteAndCartFlags(newCategoryBooks, cartBooks, favoriteIds);

        set((state) => ({
          categoryBooks: reset ? categoryBooksWithFlags : [...state.categoryBooks, ...categoryBooksWithFlags],
          categoryLastDoc: newLastDoc,
          categoryHasMore: newCategoryBooks.length === DEFAULT_BOOKS_LIMIT,
          categoryResponse: { status: "success" },
          categoryStatus: "idle",
        }));
      })
      .catch((error) =>
        set((state) => ({
          categoryBooks: reset ? [] : state.categoryBooks,
          categoryLastDoc: reset ? null : state.categoryLastDoc,
          categoryHasMore: false,
          categoryResponse: { status: "error", message: error.message },
          categoryStatus: "idle",
        }))
      );
  },

  loadMoreCategoryBooks: () => {
    if (get().categoryHasMore && get().categoryStatus !== "fetching") {
      get().loadCategoryBooks();
    }
  },

  refreshCategoryBooks: () => {
    get().loadCategoryBooks(true);
  },

  resetCategory: () => {
    set({ 
      currentCategory: "",
      categoryBooks: [],
      categoryLastDoc: null, 
      categoryStatus: "idle",
      categoryResponse: null,
      categoryHasMore: false,
    });
  },

}));

useCartStore.subscribe((state) => {
  const { categoryBooks } = useCategoryBooksStore.getState();
  
  if (categoryBooks.length > 0) {
    useCategoryBooksStore.setState({
      categoryBooks: bookHandler.addInCartFlag(categoryBooks, state.cartBooks),
    });
  }
});

useFavoritesStore.subscribe((state) => {
  const { categoryBooks } = useCategoryBooksStore.getState();
  
  if (categoryBooks.length > 0) {
    useCategoryBooksStore.setState({
      categoryBooks: bookHandler.addIsFavoriteFlag(categoryBooks, state.favoriteIds),
    });
  }
});
