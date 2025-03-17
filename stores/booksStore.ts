import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { booksApi } from "@/api/booksApi";
import { genresKeys } from "@/constants/book";
import { ADMIN_BOOKS_PAGE_SIZE, USER_CATEGORY_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { errorHandler } from "@/helpers/errorHandler";
import { Book, CreateBook, BooksStatusType, BookStatusType, BookSearchKey, EditableBookField, EditableBookValueType, CategoriesType, CategoriesStatusType, CategoryStatusType, ResponseType } from "@/types";

interface BooksStore {
  bookList: Book[];
  booksLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  booksStatus: BooksStatusType;
  booksResponse: ResponseType | null;
  booksHasMore: boolean;
  booksSearchQuery: string;
  booksSearchKeys: BookSearchKey[];

  book: Book | null;
  bookId: string | null;
  bookStatus: BookStatusType;
  bookResponse: ResponseType | null;

  categories: CategoriesType;
  categoriesStatus: CategoriesStatusType;
  categoriesResponse: ResponseType | null;

  currentCategory: string | null;

  categoryBooks: Book[];
  categoryLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  categoryStatus: CategoryStatusType;
  categoryResponse: ResponseType | null;
  categoryHasMore: boolean;
  
  setBooksSearchQuery: (query: string, keys: BookSearchKey[]) => void;
  loadBooks: (reset?: boolean) => Promise<void>;
  refreshBooks: () => void;
  loadMoreBooks: () => void;

  loadBookById: (id: string) => Promise<void>;
  createBook: (bookData: CreateBook) => Promise<void>;
  updateBook: (bookId: string, field: EditableBookField, value: EditableBookValueType) => Promise<void>;
  deleteBook: (bookId: string) => Promise<void>;
  refreshBook: () => Promise<void>;

  loadCategories: () => void;
  refreshCategories: () => void;

  loadCategoryBooks: (category: string, reset?: boolean) => Promise<void>;
  loadMoreCategoryBooks: () => void;
  refreshCategory: (category: string) => void;
}

export const useBooksStore = create<BooksStore>((set, get) => ({
  bookList: [],
  booksLastDoc: null,
  booksStatus: "idle",
  booksResponse: null,
  booksHasMore: true,
  booksSearchQuery: "",
  booksSearchKeys: [],

  book: null,
  bookId: null,
  bookStatus: "idle",
  bookResponse: null,

  categories: {},
  categoriesStatus: "idle",
  categoriesResponse: null,

  currentCategory: null,
  
  categoryBooks: [],
  categoryLastDoc: null,
  categoryStatus: "idle",
  categoryResponse: null,
  categoryHasMore: true,

  setBooksSearchQuery: (query: string, keys: BookSearchKey[]) => {
    set({ booksSearchQuery: query, booksSearchKeys: keys });
    setTimeout(() => {
      set({ booksLastDoc: null, booksHasMore: true });
      get().loadBooks(true);
    }, 500);
  },

  loadBooks: async (reset = false) => {
    const { booksLastDoc, booksSearchQuery, booksSearchKeys } = get();

    set({ booksStatus: reset ? "loading" : "fetching" });

    const fetchMethod = booksSearchQuery
      ? booksApi.searchBooks(booksSearchQuery, booksSearchKeys, reset ? null : booksLastDoc)
      : booksApi.fetchBooks(booksLastDoc, ADMIN_BOOKS_PAGE_SIZE);

    fetchMethod
      .then(({ books: newBooks, lastDoc: newLastDoc }) =>
        set((state) => ({
          bookList: reset ? newBooks : [...state.bookList, ...newBooks],
          booksLastDoc: newLastDoc,
          booksHasMore: newBooks.length === ADMIN_BOOKS_PAGE_SIZE,
          booksResponse: { status: "success" },
          booksStatus: "idle",
        }))
      )
      .catch((error) =>
        set((state) => ({
          bookList: reset ? [] : state.bookList,
          booksLastDoc: reset ? null : state.booksLastDoc,
          booksResponse: { status: "error", message: error.message },
        }))
      )
      .finally(() => set({ booksStatus: "idle" }));
  },

  refreshBooks: () => {
    const { booksStatus } = get();

    if (booksStatus === "refreshing") return;

    set({ booksStatus: "refreshing", booksLastDoc: null });
    get().loadBooks(true);
  },

  loadMoreBooks: () => {
    if (get().booksHasMore && get().booksStatus === "idle") {
      set({ booksStatus: "fetching" });
      get().loadBooks();
    }
  },

  loadBookById: async (id: string) => {
    set({ bookStatus: "loading", bookResponse: null, bookId: id });
  
    booksApi.fetchBookById(id)
      .then((book) => {
        set({
          book,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        });
      })
      .catch((error) => {
        set({
          book: null,
          bookResponse: { status: "error", message: error },
        });
      })
      .finally(() => set({ bookStatus: "idle" }));
  },

  createBook: async (bookData: CreateBook) => {
    set({ bookStatus: "creating", bookResponse: null });

    booksApi.createBook(bookData)
      .then((book) => {
        set((state) => ({
          bookList: [book, ...state.bookList],
          bookStatus: "idle",
          bookResponse: { status: "success" },
        }));
      })
      .catch((error) =>
        set({
          bookResponse: {
            status: "error",
            message: errorHandler.getErrorMessage(error, {
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

    booksApi.updateBook(bookId, field, value)
      .then((updatedBook) =>
        set((state) => ({
          bookList: state.bookList.map((book) =>
            book.id === updatedBook.id ? updatedBook : book
          ),
          book: updatedBook,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        }))
      )
      .catch((error) =>
        set({
          bookResponse: {
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
      .finally(() => set({ bookStatus: "idle" }));
  },

  deleteBook: async (bookId: string) => {
    set({ bookStatus: "deleting", bookResponse: null, bookId });

    booksApi.deleteBook(bookId)
      .then(() => {
        set((state) => ({
          bookList: state.bookList.filter((book) => book.id !== bookId),
          book: null,
          bookId: null,
          bookStatus: "idle",
          bookResponse: { status: "success" },
        }));
      })
      .catch((error) =>
        set({
          bookResponse: {
            status: "error",
            message: errorHandler.getErrorMessage(error, {
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

  loadCategories: async () => {
    set({ categoriesStatus: "loading" });

    booksApi.fetchAllCategories(genresKeys)
      .then((categories) => {
        set({
          categories,
          categoriesResponse: { status: "success" },
          categoriesStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          categories: {},
          categoriesResponse: { status: "error", message: error.message },
          categoriesStatus: "idle",
        })
      );
  },

  refreshCategories: async () => {
    const { categoriesStatus } = get();

    if (categoriesStatus === "refreshing") return;

    set({ categoriesStatus: "refreshing", categoriesResponse: null });
    get().loadCategories();
  },

  loadCategoryBooks: async (category: string, reset = false) => {
    const { currentCategory, categoryLastDoc } = get();

    set({ 
      categoryStatus: reset ? "loading" : "fetching",
      currentCategory: reset || category !== currentCategory ? category : currentCategory,
    });

    booksApi.fetchBooksByCategory(category, categoryLastDoc, USER_CATEGORY_BOOKS_PAGE_SIZE)
      .then(({ books: newCategoryBooks, lastDoc: newLastDoc }) =>
        set((state) => ({
          categoryBooks: reset ? newCategoryBooks : [...state.categoryBooks, ...newCategoryBooks],
          categoryLastDoc: newLastDoc,
          categoryHasMore: newCategoryBooks.length === USER_CATEGORY_BOOKS_PAGE_SIZE,
          categoryResponse: { status: "success" },
          categoryStatus: "idle",
        }))
      )
      .catch((error) =>
        set((state) => ({
          categoryBooks: reset ? [] : state.categoryBooks,
          categoryLastDoc: reset ? null : state.categoryLastDoc,
          categoryResponse: { status: "error", message: error.message },
        }))
      )
      .finally(() => set({ categoryStatus: "idle" }));
  },

  loadMoreCategoryBooks: () => {
    const { currentCategory, categoryHasMore, categoryStatus } = get();
  
    if (currentCategory && categoryHasMore && categoryStatus === "idle") {
      set({ categoryStatus: "fetching" });
      get().loadCategoryBooks(currentCategory);
    }
  },  

  refreshCategory: (category: string) => {
    const { categoryStatus } = get();

    if (categoryStatus === "refreshing") return;

    set({ categoryStatus: "refreshing", categoryResponse: null });
    get().loadCategoryBooks(category);
  },
}));
