import { BaseBook, Book, CartBook, FavoriteBook } from "@/types";

export const bookHandler = {
  addIsFavoriteFlag: (books: BaseBook[], favoriteIds: string[]): FavoriteBook[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
    }));
  },

  addInCartFlag: (books: BaseBook[], cartBooks: Book[]): CartBook[] => {
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
};
