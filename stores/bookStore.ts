import { create } from "zustand";
import { bookApi } from "@/api/bookApi";
import { bookHandler } from "@/helpers/bookHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Book, CreateBook, EditableBookField, EditableBookValueType, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useBooksStore } from "./booksStore";
import { useCartStore } from "./cartStore";
import { useFavoritesStore } from "./favoritesStore";

interface BookStore {
  book: Book | null;
  bookId: string;
  bookStatus: StatusType;
  bookResponse: ResponseType | null;
  setBookById: (id: string) => void;
  loadBookById: () => Promise<void>;
  createBook: (bookData: CreateBook) => Promise<void>;
  updateBook: (bookId: string, field: EditableBookField, value: EditableBookValueType) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  refreshBook: () => Promise<void>;
  resetBook: () => void;
}

export const useBookStore = create<BookStore>((set, get) => ({
  book: null,
  bookId: "",
  bookStatus: "idle",
  bookResponse: null,

  setBookById: (id: string) => {
    set({ bookId: id });
  },

  loadBookById: async () => {
    const bookId = get().bookId;
    const userId = useAuthStore.getState().user?.uid;
    if (!bookId || !userId) return;
    
    set({ bookStatus: "loading", bookResponse: null });

    const { cartBooks } = useCartStore.getState();
    const { favoriteIds } = useFavoritesStore.getState();

    bookApi
      .fetchBookById(bookId, userId)
      .then((book) =>
        set({
          book: book ? bookHandler.addFavoriteAndCartFlags([book], cartBooks, favoriteIds)[0] : null,
          bookResponse: { status: "success" },
          bookStatus: "idle",
        })
      )
      .catch((error) => {
        set({
          book: null,
          bookResponse: { status: "error", message: error.message },
          bookStatus: "idle",
        });
      });
  },

  createBook: async (bookData: CreateBook) => {
    set({ bookStatus: "creating", bookResponse: null });

    bookApi
      .createBook(bookData)
      .then((book) => {
        set({
          bookResponse: { status: "success" },
          bookStatus: "idle",
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
          bookStatus: "idle",
        })
      );
  },

  updateBook: async (bookId: string, field: EditableBookField, value: EditableBookValueType) => {
    set({ bookStatus: "updating", bookResponse: null });

    const { favoriteIds } = useFavoritesStore.getState();
    const isFavorite = favoriteIds.includes(bookId);

    bookApi
      .updateBook(bookId, field, value)
      .then((updatedBook) => {
        const updatedBookWithFavorite = { ...updatedBook, isFavorite };
        set({
          book: updatedBookWithFavorite,
          bookResponse: { status: "success" },
          bookStatus: "idle",
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
          bookStatus: "idle",
        })
      );
  },

  deleteBook: async (bookId: string) => {
    set({ bookStatus: "deleting", bookResponse: null });

    bookApi
      .deleteBook(bookId)
      .then(() => {
        set({
          book: null,
          bookId: "",
          bookResponse: { status: "success" },
          bookStatus: "idle",
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
          bookStatus: "idle",
        })
      );
  },

  refreshBook: async () => {
    get().loadBookById();
  },
  
  resetBook: () => {
    set({ 
      book: null, 
      bookId: "", 
      bookStatus: "idle", 
      bookResponse: null
    });
  },

}));

useCartStore.subscribe((state) => {
  const { book } = useBookStore.getState();
  
  if (book) {
    useBookStore.setState({
      book: bookHandler.addInCartFlag([book], state.cartBooks)[0],
    });
  }
});

useFavoritesStore.subscribe((state) => {
  const { book } = useBookStore.getState();

  if (book) {
    useBookStore.setState({
      book: bookHandler.addIsFavoriteFlag([book], state.favoriteIds)[0],
    });
  }
});
