import { useBookStore } from "@/stores/bookStore";

type BookStoreType = ReturnType<typeof useBookStore.getState>;

export const selectBookId = (state: BookStoreType) => state.bookId;
export const selectCurrentBook = (state: BookStoreType) => state.currentBook;
export const selectFetchBookStatus = (state: BookStoreType) => state.bookOperations.fetch.status;
export const selectFetchBookResponse = (state: BookStoreType) => state.bookOperations.fetch.response;
export const selectCreateBookStatus = (state: BookStoreType) => state.bookOperations.create.status;
export const selectCreateBookResponse = (state: BookStoreType) => state.bookOperations.create.response;
export const selectUpdateBookStatus = (state: BookStoreType) => state.bookOperations.update.status;
export const selectUpdateBookResponse = (state: BookStoreType) => state.bookOperations.update.response;
export const selectDeleteBookStatus = (state: BookStoreType) => state.bookOperations.delete.status;
export const selectDeleteBookResponse = (state: BookStoreType) => state.bookOperations.delete.response;

export const selectSetBookById = (state: BookStoreType) => state.setBookById;
export const selectFetchBookById = (state: BookStoreType) => state.fetchBookById;
export const selectCreateBook = (state: BookStoreType) => state.createBook;
export const selectUpdateBook = (state: BookStoreType) => state.updateBook;
export const selectDeleteBook = (state: BookStoreType) => state.deleteBook;
export const selectRefreshBook = (state: BookStoreType) => state.refreshBook;
export const selectSetBookOperationState = (state: BookStoreType) => state.setBookOperationState;
export const selectResetBookOperationState = (state: BookStoreType) => state.resetBookOperationState;
export const selectResetCurrentBook = (state: BookStoreType) => state.resetCurrentBook;
export const selectResetAll = (state: BookStoreType) => state.resetAll;
