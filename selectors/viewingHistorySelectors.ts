import { createSelector } from "reselect";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import { ViewingHistoryBook } from "@/types";

type ViewingHistoryStoreType = ReturnType<typeof useViewingHistoryStore.getState>;

export const selectViewingHistoryBooks = (state: ViewingHistoryStoreType) => state.viewingHistoryBooks;
export const selectViewingHistoryStatus = (state: ViewingHistoryStoreType) => state.viewingHistoryStatus;
export const selectViewingHistoryResponse = (state: ViewingHistoryStoreType) => state.viewingHistoryResponse;

export const selectLoadViewingHistory = (state: ViewingHistoryStoreType) => state.loadViewingHistory;

export const selectGroupedViewingHistory = createSelector(
  [selectViewingHistoryBooks],
  (books) => {
    const groupedObject = books.reduce<Record<string, ViewingHistoryBook[]>>((acc, book) => {
      const date = new Date(book.timestamp).toISOString().split("T")[0];
      
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(book);    
      return acc;
    }, {});

    return Object.entries(groupedObject)
      .map(([date, books]) => ({
        date,
        books: books.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
);
