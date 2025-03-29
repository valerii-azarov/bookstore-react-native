import { createSelector } from "reselect";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import { ViewingHistoryBook } from "@/types";

type ViewingHistoryStoreType = ReturnType<typeof useViewingHistoryStore.getState>;

export const selectViewingHistoryBooks = createSelector(
  (state: ViewingHistoryStoreType) => state.viewingHistoryBooks,
  (books) => books
);

export const selectViewingHistoryByDate = createSelector(
  [selectViewingHistoryBooks],
  (books) => {
    const booksByDate = books.reduce<Record<string, ViewingHistoryBook[]>>((acc, book) => {
      const date = new Date(book.timestamp).toISOString().split("T")[0];
      
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(book);    
      return acc;
    }, {});

    return Object.entries(booksByDate)
      .map(([date, books]) => ({
        date,
        books: books.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);

export const selectViewingHistoryStatus = createSelector(
  (state: ViewingHistoryStoreType) => state.viewingHistoryStatus,
  (status) => status
);

export const selectViewingHistoryResponse = createSelector(
  (state: ViewingHistoryStoreType) => state.viewingHistoryResponse,
  (response) => response
);

export const selectLoadViewingHistory = (state: ViewingHistoryStoreType) => state.loadViewingHistory;
export const selectResetViewingHistory = (state: ViewingHistoryStoreType) => state.resetViewingHistory;
