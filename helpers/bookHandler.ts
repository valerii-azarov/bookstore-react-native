import {
  BaseBook,
  Book,
  Cart,
  Favorite,
  EditableBookField,
  EditableBookValue,
} from "@/types";

const defaultBookValues: Record<EditableBookField, EditableBookValue> = {
  title: "",
  authors: [],
  backgroundColor: "",
  description: "",
  genres: [],
  language: "",
  publisher: "",
  publicationYear: 0,
  isbn: "",
  pageCount: 0,
  coverType: "",
  bookType: "",
  paperType: "",
  size: "",
  weight: 0,
  illustrations: false,
  availableQuantity: 0,
  sku: "",
  rates: {
    originalPrice: 0,
    discount: 0,
    price: 0,
  },
  images: {
    coverImage: "",
    additionalImages: [],
  },
};

export const bookHandler = {
  addIsFavoriteFlag: (books: BaseBook[], favoriteIds: string[]): Favorite[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
    }));
  },

  addInCartFlag: (books: BaseBook[], cartBooks: Book[]): Cart[] => {
    return books.map((book) => ({
      ...book,
      inCart: cartBooks.some((cartBook) => cartBook.id === book.id),
      cartQuantity: cartBooks.find((cartBook) => cartBook.id === book.id)?.cartQuantity || 0,
    }));
  },

  addFavoriteAndCartFlags: (books: BaseBook[], cartBooks: Book[], favoriteIds: string[]): Book[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
      inCart: cartBooks.some((cartBook) => cartBook.id === book.id),
      cartQuantity: cartBooks.find((cartBook) => cartBook.id === book.id)?.cartQuantity || 0,
    }));
  }, 
  
  getInitialBookValue: (book: BaseBook | null, field: EditableBookField): EditableBookValue => {
    if (field === "rates") {
      return {
        originalPrice: book?.originalPrice ?? 0,
        discount: book?.discount ?? 0,
        price: book?.price ?? 0,
      };
    }

    if (field === "images") {
      return {
        coverImage: book?.coverImage ?? "",
        additionalImages: book?.additionalImages ?? [],
      };
    }

    if (book && field in book) {
      return book[field] as EditableBookValue;
    }

    return defaultBookValues[field];
  },
};
