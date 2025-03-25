import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { categoryBooksApi } from "@/api/categoryBooksApi";
import { USER_CATEGORY_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { bookHandler } from "@/helpers/bookHandler";
import { Book, CategoryStatusType, ResponseType } from "@/types";

import { useFavoritesStore } from "./favoritesStore";

interface CategoryBooksStore {
  currentCategory: string | null;
  categoryBooks: Book[];
  categoryLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  categoryStatus: CategoryStatusType;
  categoryResponse: ResponseType | null;
  categoryHasMore: boolean;
  loadCategoryBooks: (category: string) => Promise<void>;
  loadMoreCategoryBooks: () => void;
  resetCategory: () => void;
}

export const useCategoryBooksStore = create<CategoryBooksStore>((set, get) => ({
  currentCategory: null,
  categoryBooks: [],
  categoryLastDoc: null,
  categoryStatus: "idle",
  categoryResponse: null,
  categoryHasMore: true,

  loadCategoryBooks: async (category: string) => {
    const { currentCategory, categoryLastDoc } = get();
    
    const isNewCategory = category !== currentCategory;
    set({
      categoryStatus: isNewCategory ? "loading" : "fetching",
      ...(isNewCategory && {
        currentCategory: category,
        categoryBooks: [],
        categoryLastDoc: null,
        categoryHasMore: true,
      }),
    });

    const { favoriteIds } = useFavoritesStore.getState();

    categoryBooksApi.fetchBooksByCategory(category, isNewCategory ? null : categoryLastDoc, USER_CATEGORY_BOOKS_PAGE_SIZE)
      .then(({ books: newCategoryBooks, lastDoc: newLastDoc }) => {
        const booksWithFavorite = bookHandler.addIsFavoriteFlag(newCategoryBooks, favoriteIds);
        set((state) => ({
          categoryBooks: isNewCategory ? booksWithFavorite : [...state.categoryBooks, ...booksWithFavorite],
          categoryLastDoc: newLastDoc,
          categoryHasMore: newCategoryBooks.length === USER_CATEGORY_BOOKS_PAGE_SIZE,
          categoryResponse: { status: "success" },
          categoryStatus: "idle",
        }));
      })
      .catch((error) =>
        set((state) => ({
          categoryBooks: isNewCategory ? [] : state.categoryBooks,
          categoryLastDoc: isNewCategory ? null : state.categoryLastDoc,
          categoryResponse: { status: "error", message: error.message },
          categoryStatus: "idle",
        }))
      )
      .finally(() => set({ categoryStatus: "idle" }));
  },

  loadMoreCategoryBooks: () => {
    const { currentCategory, categoryHasMore, categoryStatus } = get();

    if (currentCategory && categoryHasMore && categoryStatus === "idle") {
      set({ categoryStatus: "fetching" });
      get().loadCategoryBooks(currentCategory);
    }
  },

  resetCategory: () => {
    set({ categoryBooks: [], categoryLastDoc: null, categoryHasMore: true, currentCategory: null });
  },

}));

useFavoritesStore.subscribe((state) => {
  const { categoryBooks } = useCategoryBooksStore.getState();
  
  if (categoryBooks.length > 0) {
    useCategoryBooksStore.setState({
      categoryBooks: bookHandler.addIsFavoriteFlag(categoryBooks, state.favoriteIds),
    });
  }
});
