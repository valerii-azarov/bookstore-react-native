import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { booksApi } from "@/api/booksApi";
import { DEFAULT_BOOKS_LIMIT } from "@/constants/settings";
import { BaseBook, BookSearchKey, BooksResponse, StatusType, ResponseType } from "@/types";

interface SearchedBooksStore {
  searchedBooks: BaseBook[];
  searchedBooksLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  searchedBooksStatus: StatusType;
  searchedBooksResponse: ResponseType | null;
  searchedBooksHasMore: boolean;
  searchQuery: string;
  searchKeys: BookSearchKey[];
  setSearchQuery: (query: string, keys: BookSearchKey[], asBooksResponse?: boolean) => void;
  loadSearchedBooks: (reset?: boolean, asBooksResponse?: boolean) => Promise<void>;
  loadMoreSearchedBooks: () => void;
  refreshSearchedBooks: () => void;
  resetAll: () => void;
}

export const useSearchedBooksStore = create<SearchedBooksStore>((set, get) => ({
  searchedBooks: [],
  searchedBooksLastDoc: null,
  searchedBooksStatus: "idle",
  searchedBooksResponse: null,
  searchedBooksHasMore: false,
  searchQuery: "",
  searchKeys: [],

  setSearchQuery: (query: string, keys: BookSearchKey[], asBooksResponse = false) => {
    set({ 
      searchedBooksLastDoc: null, 
      searchedBooksHasMore: false, 
      searchQuery: query, 
      searchKeys: keys
    });
    query.trim() ? setTimeout(() => get().loadSearchedBooks(true, asBooksResponse), 500) : get().resetAll();
  },
  
  loadSearchedBooks: async (reset = false, asBooksResponse = false) => {
    if (get().searchedBooksStatus === "fetching" || get().searchedBooksStatus === "loading") return;

    set({
      searchedBooksStatus: reset ? "loading" : "fetching",
      searchedBooksResponse: null,
      ...(reset && { 
        searchedBooks: [], 
        searchedBooksLastDoc: null, 
        searchedBooksHasMore: false 
      }),
    });

    const fetchMethod = asBooksResponse
      ? booksApi.searchBooks<BooksResponse>(
          get().searchQuery, 
          get().searchKeys, {
            limit: DEFAULT_BOOKS_LIMIT,
            lastDoc: reset ? null : get().searchedBooksLastDoc,
            asBooksResponse: true,
          }
        )
      : booksApi.searchBooks<BaseBook[]>(get().searchQuery, get().searchKeys);

    fetchMethod
      .then((result) => {
        const newBooks = asBooksResponse ? (result as BooksResponse).books : (result as BaseBook[]);
        const newLastDoc = asBooksResponse ? (result as BooksResponse).lastDoc : null;
        const hasMore = asBooksResponse ? newBooks.length === DEFAULT_BOOKS_LIMIT : false;
        
        set((state) => ({
          searchedBooks: reset ? newBooks : [...state.searchedBooks, ...newBooks],
          searchedBooksLastDoc: newLastDoc,
          searchedBooksHasMore: hasMore,
          searchedBooksResponse: { status: "success" },
          searchedBooksStatus: "idle",
        }));
      })
      .catch((error) =>
        set((state) => ({
          searchedBooks: reset ? [] : state.searchedBooks,
          searchedBooksLastDoc: reset ? null : state.searchedBooksLastDoc,
          searchedBooksHasMore: false,
          searchedBooksResponse: { status: "error", message: error.message },
          searchedBooksStatus: "idle",
        }))
      );
  },

  loadMoreSearchedBooks: () => {
    if (get().searchedBooksHasMore && get().searchedBooksStatus !== "fetching") {
      get().loadSearchedBooks(false, true);
    }
  },

  refreshSearchedBooks: () => {
    get().loadSearchedBooks(true, true);
  },

  resetAll: () => set({
    searchedBooks: [],
    searchedBooksLastDoc: null,
    searchedBooksStatus: "idle",
    searchedBooksResponse: null,
    searchedBooksHasMore: false,
    searchQuery: "",
    searchKeys: [],
  }),

}));
