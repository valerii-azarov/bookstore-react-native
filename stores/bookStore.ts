import { create } from "zustand";
import { bookApi } from "@/api/bookApi";
import { bookHandler } from "@/helpers/bookHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Book, BookCreation, EditableBookField, EditableBookValue, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useBooksStore } from "./booksStore";
import { useCartStore } from "./cartStore";
import { useFavoritesStore } from "./favoritesStore";

type BookOperation = "fetch" | "create" | "update" | "delete";

type BookOperationState = {
  status: StatusType;
  response: ResponseType | null;
};

interface BookStore {
  bookId: string;
  currentBook: Book | null;
  bookOperations: Record<BookOperation, BookOperationState>;
  setBookById: (id: string) => void;
  fetchBookById: () => Promise<void>;
  createBook: (bookData: BookCreation) => Promise<void>;
  updateBook: (bookId: string, field: EditableBookField, value: EditableBookValue) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  refreshBook: () => Promise<void>;
  setBookOperationState: (op: BookOperation, state: Partial<BookOperationState>) => void;
  resetBookOperationState: (op: BookOperation) => void;
  resetCurrentBook: () => void;
  resetAll: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  bookId: "",
  currentBook: null,
  bookOperations: {
    fetch: { status: "idle", response: null },
    create: { status: "idle", response: null },
    update: { status: "idle", response: null },
    delete: { status: "idle", response: null },
  },

  setBookById: (id: string) => {
    set({ bookId: id });
  },

  fetchBookById: async () => {
    const bookId = get().bookId;
    const userId = useAuthStore.getState().user?.uid;

    if (!bookId || !userId) return;
    
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        fetch: { status: "loading", response: null },
      },
    }));

    const cartBooks = useCartStore.getState().cartBooks;
    const favoriteIds = useFavoritesStore.getState().favoriteIds;

    bookApi
      .fetchBookById(bookId, userId)
      .then((book) =>
        set((state) => ({
          currentBook: book ? bookHandler.addFavoriteAndCartFlags([book], cartBooks, favoriteIds)[0] : null,
          bookOperations: {
            ...state.bookOperations,
            fetch: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }))
      )
      .catch((error) => 
        set((state) => ({
          currentBook: null,
          bookOperations: {
            ...state.bookOperations,
            fetch: {
              status: "idle",
              response: { status: "error", message: error.message },
            },
          },
        }))
      );
  },

  createBook: async (bookData: BookCreation) => {
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        create: { status: "creating", response: null },
      },
    }));

    bookApi
      .createBook(bookData)
      .then((book) => {
        set((state) => ({
          bookOperations: {
            ...state.bookOperations,
            create: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
        useBooksStore.setState((state) => ({
          books: [book, ...state.books],
        }));
      })
      .catch((error) =>
        set((state) => ({
          currentBook: null,
          bookOperations: {
            ...state.bookOperations,
            create: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "image/invalid-image-object": "image.invalidImageObject",
                    "image/no-secure-url": "image.noSecureUrl",
                    "books/upload-failed": "books.uploadFailed",
                    "books/upload-additional-failed": "books.uploadAdditionalFailed",
                    "books/created-book-not-found": "books.createdBookNotFound",
                  }
                ),
              },
            },
          },
        }))
      );
  },

  updateBook: async (bookId: string, field: EditableBookField, value: EditableBookValue) => {
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        update: { status: "updating", response: null },
      },
    }));

    const favoriteIds = useFavoritesStore.getState().favoriteIds;
    const isFavorite = favoriteIds.includes(bookId);

    bookApi
      .updateBook(bookId, field, value)
      .then((updatedBook) => {
        const updatedBookWithFavorite = { ...updatedBook, isFavorite };
        set((state) => ({
          currentBook: updatedBookWithFavorite,
          bookOperations: {
            ...state.bookOperations,
            update: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
        useBooksStore.setState((state) => ({
          books: state.books.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          ),
        }));
      })
      .catch((error) =>
        set((state) => ({
          bookOperations: {
            ...state.bookOperations,
            update: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "image/invalid-image-object": "image.invalidImageObject",
                    "image/no-secure-url": "image.noSecureUrl",
                    "image/invalid-url": "image.invalidUrl",
                    "image/delete-failed": "image.deleteFailed",
                    "books/book-not-found": "books.bookNotFound",
                    "books/book-not-found-after-update": "books.bookNotFoundAfterUpdate",
                    "books/upload-failed": "books.uploadFailed",
                    "books/upload-additional-failed": "books.uploadAdditionalFailed",
                  }
                ),
              },
            },
          },
        }))
      );
  },

  deleteBook: async (bookId: string) => {
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        delete: { status: "deleting", response: null },
      },
    }));

    bookApi
      .deleteBook(bookId)
      .then(() => {
        set((state) => ({
          bookId: "",
          currentBook: null,
          bookOperations: {
            ...state.bookOperations,
            delete: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
        useBooksStore.setState((state) => ({
          books: state.books.filter((book) => book.id !== bookId),
        }));
      })
      .catch((error) =>
        set((state) => ({
          bookOperations: {
            ...state.bookOperations,
            delete: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "books/book-not-found": "books.bookNotFound",
                    "image/delete-failed": "image.deleteFailed",
                  }
                ),
              },
            },
          },
        }))
      );
  },

  refreshBook: async () => {
    get().fetchBookById();
  },

  setBookOperationState: (op, stateUpdate) => {
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        [op]: { ...state.bookOperations[op], ...stateUpdate },
      },
    }));
  },
  
  resetBookOperationState: (op) => {
    set((state) => ({
      bookOperations: {
        ...state.bookOperations,
        [op]: { status: "idle", response: null },
      },
    }));
  },

  resetCurrentBook: () => {
    set((state) => ({
      bookId: "",
      currentBook: null,
      bookOperations: {
        ...state.bookOperations,
        fetch: { status: "idle", response: null },
      },
    }));
  },  

  resetAll: () => {
    set({
      bookId: "",
      currentBook: null,
      bookOperations: {
        fetch: { status: "idle", response: null },
        create: { status: "idle", response: null },
        update: { status: "idle", response: null },
        delete: { status: "idle", response: null },
      },
    });
  },
}));

useCartStore.subscribe((state) => {
  const currentBook = useBookStore.getState().currentBook;
  
  if (currentBook) {
    useBookStore.setState({
      currentBook: bookHandler.addInCartFlag([currentBook], state.cartBooks)[0],
    });
  }
});

useFavoritesStore.subscribe((state) => {
  const currentBook = useBookStore.getState().currentBook;

  if (currentBook) {
    useBookStore.setState({
      currentBook: bookHandler.addIsFavoriteFlag([currentBook], state.favoriteIds)[0],
    });
  }
});
