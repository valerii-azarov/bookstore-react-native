import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { booksApi } from "@/api/booksApi";
import { DEFAULT_BOOKS_LIMIT } from "@/constants/settings";
import { BaseBook, StatusType, ResponseType } from "@/types";

interface BooksStore {
  books: BaseBook[];
  booksLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  booksStatus: StatusType;
  booksResponse: ResponseType | null;
  booksHasMore: boolean;
  loadBooks: (reset?: boolean) => Promise<void>;
  loadMoreBooks: () => void;
  refreshBooks: () => void;
  resetAll: () => void;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  books: [],
  booksLastDoc: null,
  booksStatus: "idle",
  booksResponse: null,
  booksHasMore: false,

  loadBooks: async (reset = false) => {
    if (get().booksStatus === "fetching" || get().booksStatus === "loading") return;

    set({
      booksStatus: reset ? "loading" : "fetching",
      booksResponse: null,
      ...(reset && { 
        books: [],
        booksLastDoc: null, 
        booksHasMore: false
      }),
    });

    booksApi
      .fetchBooks(
        reset ? null : get().booksLastDoc, 
        DEFAULT_BOOKS_LIMIT
      )
      .then(({ books: newBooks, lastDoc: newLastDoc }) =>
        set((state) => ({
          books: reset ? newBooks : [...state.books, ...newBooks],
          booksLastDoc: newLastDoc,
          booksHasMore: newBooks.length === DEFAULT_BOOKS_LIMIT,
          booksResponse: { status: "success" },
          booksStatus: "idle",
        }))
      )
      .catch((error) =>
        set((state) => ({
          books: reset ? [] : state.books,
          booksLastDoc: reset ? null : state.booksLastDoc,
          booksHasMore: false,
          booksResponse: { status: "error", message: error.message },
          booksStatus: "idle",
        }))
      );
  },

  loadMoreBooks: () => {
    if (get().booksHasMore && get().booksStatus !== "fetching") {
      get().loadBooks();
    }
  },

  refreshBooks: () => {
    get().loadBooks(true);
  },

  resetAll: () => set({
    books: [],
    booksLastDoc: null,
    booksStatus: "idle",
    booksResponse: null,
    booksHasMore: false,
  }),

}));
