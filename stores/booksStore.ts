import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { booksApi } from "@/api/booksApi";
import { ADMIN_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { BaseBook, BooksStatusType, BookSearchKey, ResponseType } from "@/types";

interface BooksStore {
  books: BaseBook[];
  booksLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  booksStatus: BooksStatusType;
  booksResponse: ResponseType | null;
  booksHasMore: boolean;
  booksSearchQuery: string;
  booksSearchKeys: BookSearchKey[];
  setBooksSearchQuery: (query: string, keys: BookSearchKey[]) => void;
  loadBooks: (reset?: boolean) => Promise<void>;
  refreshBooks: () => void;
  loadMoreBooks: () => void;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  books: [],
  booksLastDoc: null,
  booksStatus: "idle",
  booksResponse: null,
  booksHasMore: true,
  booksSearchQuery: "",
  booksSearchKeys: [],

  setBooksSearchQuery: (query: string, keys: BookSearchKey[]) => {
    set({ booksSearchQuery: query, booksSearchKeys: keys });
    setTimeout(() => {
      set({ booksLastDoc: null, booksHasMore: true });
      get().loadBooks(true);
    }, 500);
  },

  loadBooks: async (reset = false) => {
    const { booksLastDoc, booksSearchQuery, booksSearchKeys } = get();

    set({ booksStatus: reset ? "loading" : "fetching" });

    const fetchMethod = booksSearchQuery
      ? booksApi.searchBooks(booksSearchQuery, booksSearchKeys, reset ? null : booksLastDoc)
      : booksApi.fetchBooks(booksLastDoc, ADMIN_BOOKS_PAGE_SIZE);

    fetchMethod
      .then(({ books: newBooks, lastDoc: newLastDoc }) =>
        set((state) => ({
          books: reset ? newBooks : [...state.books, ...newBooks],
          booksLastDoc: newLastDoc,
          booksHasMore: newBooks.length === ADMIN_BOOKS_PAGE_SIZE,
          booksResponse: { status: "success" },
          booksStatus: "idle",
        }))
      )
      .catch((error) =>
        set((state) => ({
          books: reset ? [] : state.books,
          booksLastDoc: reset ? null : state.booksLastDoc,
          booksResponse: { status: "error", message: error.message },
        }))
      )
      .finally(() => set({ booksStatus: "idle" }));
  },

  refreshBooks: () => {
    const { booksStatus } = get();

    if (booksStatus === "refreshing") return;
    
    set({ booksStatus: "refreshing", booksLastDoc: null });
    get().loadBooks(true);
  },

  loadMoreBooks: () => {
    if (get().booksHasMore && get().booksStatus === "idle") {
      set({ booksStatus: "fetching" });
      get().loadBooks();
    }
  },

}));
