import { create } from "zustand";
import { bookApi } from "@/api/bookApi";
import { bookHandler } from "@/helpers/bookHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Book, CreateBook, BookStatusType, EditableBookField, EditableBookValueType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useBooksStore } from "./booksStore";
import { useFavoritesStore } from "./favoritesStore";

interface BookStore {
  book: Book | null;
  bookId: string | null;
  bookStatus: BookStatusType;
  bookResponse: ResponseType | null;
  loadBookById: (bookId: string) => Promise<void>;
  createBook: (bookData: CreateBook) => Promise<void>;
  updateBook: (bookId: string, field: EditableBookField, value: EditableBookValueType) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  refreshBook: () => Promise<void>;
}

export const useBookStore = create<BookStore>((set, get) => ({
  book: null,
  bookId: null,
  bookStatus: "idle",
  bookResponse: null,

  loadBookById: async (bookId: string) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ bookStatus: "loading", bookResponse: null, bookId });

    const { favoriteIds } = useFavoritesStore.getState();

    bookApi.fetchBookById(bookId, userId)
      .then((book) =>
        set({
          book: book ? bookHandler.addIsFavoriteFlag([book], favoriteIds)[0] : null,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        })
      )
      .catch((error) => {
        set({
          book: null,
          bookResponse: { status: "error", message: error.message },
        });
      })
      .finally(() => set({ bookStatus: "idle" }));
  },

  createBook: async (bookData: CreateBook) => {
    set({ bookStatus: "creating", bookResponse: null });

    bookApi.createBook(bookData)
      .then((book) => {
        set({
          bookStatus: "idle",
          bookResponse: { status: "success" },
        });
        useBooksStore.setState((state) => ({
          books: [book, ...state.books],
        }));
      })
      .catch((error) =>
        set({
          bookResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
              "image/invalid-image-object": "image.invalidImageObject",
              "image/no-secure-url": "image.noSecureUrl",
              "books/upload-failed": "books.uploadFailed",
              "books/upload-additional-failed": "books.uploadAdditionalFailed",
              "books/created-book-not-found": "books.createdBookNotFound",
            }),
          },
        })
      )
      .finally(() => set({ bookStatus: "idle" }));
  },

  updateBook: async (bookId: string, field: EditableBookField, value: EditableBookValueType) => {
    set({ bookStatus: "updating", bookResponse: null, bookId });

    const { favoriteIds } = useFavoritesStore.getState();
    const isFavorite = favoriteIds.includes(bookId);

    bookApi.updateBook(bookId, field, value)
      .then((updatedBook) => {
        const updatedBookWithFavorite = { ...updatedBook, isFavorite };
        set({
          book: updatedBookWithFavorite,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        });
        useBooksStore.setState((state) => ({
          books: state.books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          ),
        }));
      })
      .catch((error) =>
        set({
          bookResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
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
      .finally(() => set({ bookStatus: "idle" }));
  },

  deleteBook: async (bookId: string) => {
    set({ bookStatus: "deleting", bookResponse: null, bookId });

    bookApi.deleteBook(bookId)
      .then(() => {
        set({
          book: null,
          bookId: null,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        });
        useBooksStore.setState((state) => ({
          books: state.books.filter((book) => book.id !== bookId),
        }));
      })
      .catch((error) =>
        set({
          bookResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
              "books/book-not-found": "books.bookNotFound",
              "image/delete-failed": "image.deleteFailed",
            }),
          },
        })
      )
      .finally(() => set({ bookStatus: "idle" }));
  },

  refreshBook: async () => {
    const { bookId, bookStatus } = get();

    if (bookStatus === "loading" || !bookId) return;

    set({ bookStatus: "loading", bookResponse: null });
    get().loadBookById(bookId);
  },
  
}));

useFavoritesStore.subscribe((state) => {
  const { book } = useBookStore.getState();

  if (book) {
    useBookStore.setState({
      book: bookHandler.addIsFavoriteFlag([book], state.favoriteIds)[0],
    });
  }
});
