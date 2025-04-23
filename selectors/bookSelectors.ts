import { useBookStore } from "@/stores/bookStore";

type BookStoreType = ReturnType<typeof useBookStore.getState>;

export const selectBook = (state: BookStoreType) => state.book;
export const selectBookId = (state: BookStoreType) => state.bookId;
export const selectBookStatus = (state: BookStoreType) => state.bookStatus;
export const selectBookResponse = (state: BookStoreType) => state.bookResponse;

export const selectLoadBookById = (state: BookStoreType) => state.loadBookById;
export const selectCreateBook = (state: BookStoreType) => state.createBook;
export const selectUpdateBook = (state: BookStoreType) => state.updateBook;
export const selectDeleteBook = (state: BookStoreType) => state.deleteBook;
export const selectRefreshBook = (state: BookStoreType) => state.refreshBook;
export const selectResetBook = (state: BookStoreType) => state.resetBook;
