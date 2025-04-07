import { format } from "date-fns";
import { BaseBook, ViewingHistory, ViewingHistoryEntry, ViewingHistoryByDate } from "@/types";

export const viewingHistoryHandler = {
  addTimestamp: (books: BaseBook[], history: ViewingHistoryEntry[]): ViewingHistory[] => {
    return books.map((book) => ({
      ...book,
      timestamp: history.find(entry => entry.bookId === book.id)?.timestamp || new Date(),
    }));
  },

  groupViewingHistoryByDate: (incoming: ViewingHistory[] = []): ViewingHistoryByDate[] => {
    const grouped: Record<string, ViewingHistory[]> = {};
  
    incoming.forEach((history) => {
      const date = format(new Date(history.timestamp), "yyyy-MM-dd");
      
      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(history);
    });

    return Object.entries(grouped)
      .map(([date, history]) => ({
        date,
        books: history.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
};
