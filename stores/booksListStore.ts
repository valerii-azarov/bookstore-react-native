import { create } from "zustand";
import booksApi from "@/api/booksApi";
import { booksAdminPageSize } from "@/constants/settings";
import { Book, ResponseType } from "@/types";

interface BooksListState {
  data: Book[];
  isLoading: boolean;
  isFetching: boolean;
  isRefreshing: boolean;
  response: ResponseType | null;
  searchText: string;
  offset: number;
  hasMore: boolean;
  setSearchText: (text: string) => void;
  loadBooks: (query: string, currentOffset: number, reset?: boolean) => Promise<void>;
  refresh: () => void;
  loadMore: () => void;
}

export const useBooksListStore = create<BooksListState>()((set, get) => ({
  data: [],
  isLoading: false,
  isFetching: false,
  isRefreshing: false,
  response: null,
  searchText: "",
  offset: 0,
  hasMore: true,

  setSearchText: (text: string) => {
    set({ searchText: text });
    setTimeout(() => (set({ offset: 0 }), get().loadBooks(text, 0, true)), 500);
  },

  loadBooks: async (query, offset, reset = false) => {    
    set(
      reset
        ? { isLoading: true, isFetching: false, isRefreshing: false }
        : { isLoading: false, isFetching: true }
    );

    return booksApi
      .searchBooks(query, booksAdminPageSize, offset, ["title", "sku"])
      .then((books) =>
        set((state) => ({
          data: reset ? books : [...state.data, ...books],
          hasMore: books.length === booksAdminPageSize,
          response: { status: "success" },
        }))
      )
      .catch((error) =>
        set((state) => ({
          data: reset ? [] : state.data,
          response: { status: "error", message: error.message },
        }))
      )
      .finally(() =>
        set({ isLoading: false, isFetching: false, isRefreshing: false })
      );
  },

  refresh: () => {
    if (get().isRefreshing) return;

    set({ isRefreshing: true, offset: 0 });
    get().loadBooks(get().searchText, 0, true);
  },

  loadMore: () => {
    const { hasMore, isLoading, isFetching, isRefreshing, offset, searchText } = get();

    if (hasMore && !isLoading && !isFetching && !isRefreshing) {
      const newOffset = offset + booksAdminPageSize;
      set({ offset: newOffset });
      get().loadBooks(searchText, newOffset);
    }
  },
}));
