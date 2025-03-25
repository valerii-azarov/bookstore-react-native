import { BaseBook, Book } from "@/types";

export const bookHandler = {
  addIsFavoriteFlag: (books: BaseBook[], favoriteIds: string[]): Book[] => {
    return books.map((book) => ({
      ...book,
      isFavorite: favoriteIds.includes(book.id),
    }));
  },
};
