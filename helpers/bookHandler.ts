import { BaseBook, Book } from "@/types";

export const bookHandler = {
  addIsFavoriteFlag: (books: BaseBook[], favoriteIds: string[]): Book[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
    }));
  },

  addInCartFlag: (books: BaseBook[], cartBooks: Book[]): Book[] => {
    return books.map((book) => ({
      ...book,
      inCart: cartBooks.some((cartBook) => cartBook.id === book.id),
      quantity: cartBooks.find((cartBook) => cartBook.id === book.id)?.quantity || book.quantity,
    }));
  },

  addFavoriteAndCartFlags: (books: BaseBook[], cartBooks: Book[], favoriteIds: string[]): Book[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
      inCart: cartBooks.some((cartBook) => cartBook.id === book.id),
      quantity: cartBooks.find((cartBook) => cartBook.id === book.id)?.quantity || book.quantity,
    }));
  },
};
