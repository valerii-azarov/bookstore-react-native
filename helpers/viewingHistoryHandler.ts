import { BaseBook, ViewingHistory, ViewingHistoryBook } from "@/types";

export const viewingHistoryHandler = {
  addTimestamp: (books: BaseBook[], history: ViewingHistory[]): ViewingHistoryBook[] => {
    return books.map((book) => ({
      ...book,
      timestamp: history.find(entry => entry.bookId === book.id)?.timestamp || new Date(),
    }));
  },
};
