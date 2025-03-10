import { create } from "zustand";
import booksApi from "@/api/booksApi";
import { errorHandler } from "@/helpers/errorHandler";
import { Book, CreateBook, EditableBookField, EditableBookValueType, ResponseType } from "@/types";

interface BookState {
  bookId: string;
  data: Book | null;
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  response: ResponseType | null;
  setBookId: (id: string) => void;
  loadBook: () => Promise<void>;
  createBook: (data: CreateBook) => Promise<void>;
  updateBook: (field: EditableBookField, value: EditableBookValueType) => Promise<void>;
  deleteBook: () => Promise<void>;
  refresh: () => Promise<void>;
}

export const useBookStore = create<BookState>((set, get) => ({
  bookId: "",
  data: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  response: null,

  setBookId: (id) => {
    set({ bookId: id, data: null, response: null });
    if (id) {
      get().loadBook();
    }
  },

  loadBook: async () => {
    const bookId = get().bookId;
    if (!bookId) return;

    set({ isLoading: true });
    return booksApi
      .getBookById(bookId)
      .then((book) => set({ data: book, response: { status: "success" } }))
      .catch((error) =>
        set({
          data: null,
          response: { status: "error", message: error },
        })
      )
      .finally(() => set({ isLoading: false }));
  },

  createBook: async (data) => {
    set({ isCreating: true });
    return booksApi
      .createBook(data)
      .then(() => set({ response: { status: "success" } }))
      .catch((error) =>
        set({
          response: {
            status: "error",
            message: errorHandler.getErrorMessage(error, {
              "image/invalid-image-object": "image.invalidImageObject",
              "image/no-secure-url": "image.noSecureUrl",
              "books/upload-failed": "books.uploadFailed",
              "books/upload-additional-failed": "books.uploadAdditionalFailed",
            }),
          },
        })
      )
      .finally(() => set({ isCreating: false }));
  },

  updateBook: async (field, value) => {
    const bookId = get().bookId;
    if (!bookId) return;

    set({ isUpdating: true });
    return booksApi
      .updateBook(bookId, field, value)
      .then((book) => set({ data: book, response: { status: "success" } }))
      .catch((error) =>
        set({
          response: {
            status: "error",
            message: errorHandler.getErrorMessage(error, {
              "image/invalid-image-object": "image.invalidImageObject",
              "image/no-secure-url": "image.noSecureUrl",
              "image/invalid-url": "image.invalidUrl",
              "image/delete-failed": "image.deleteFailed",
              "books/book-not-found": "books.bookNotFound",
              "books/book-not-found-after-update": "books.bookNotFoundAfterUpdate",
              "books/upload-failed": "books.uploadFailed",
              "books/upload-additional-failed": "books.uploadAdditionalFailed",
            }),
          },
        })
      )
      .finally(() => set({ isUpdating: false }));
  },

  deleteBook: async () => {
    const bookId = get().bookId;
    if (!bookId) return;

    set({ isDeleting: true });
    return booksApi
      .deleteBook(get().bookId)
      .then(() => set({ response: { status: "success" } }))
      .catch((error) =>
        set({
          response: {
            status: "error",
            message: errorHandler.getErrorMessage(error, {
              "books/book-not-found": "books.bookNotFound",
              "image/delete-failed": "image.deleteFailed",
            }),
          },
        })
      )
      .finally(() => set({ isDeleting: false }));
  },

  refresh: () => get().loadBook(),
}));
