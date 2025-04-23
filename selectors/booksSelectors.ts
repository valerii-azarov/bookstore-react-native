import { useBooksStore } from "@/stores/booksStore";

type BooksStoreType = ReturnType<typeof useBooksStore.getState>;

export const selectBooks = (state: BooksStoreType) => state.books;
export const selectBooksLastDoc = (state: BooksStoreType) => state.booksLastDoc;
export const selectBooksStatus = (state: BooksStoreType) => state.booksStatus;
export const selectBooksResponse = (state: BooksStoreType) => state.booksResponse;
export const selectBooksHasMore = (state: BooksStoreType) => state.booksHasMore;

export const selectLoadBooks = (state: BooksStoreType) => state.loadBooks;
export const selectRefreshBooks = (state: BooksStoreType) => state.refreshBooks;
export const selectLoadMoreBooks = (state: BooksStoreType) => state.loadMoreBooks;
export const selectResetAll = (state: BooksStoreType) => state.resetAll;
