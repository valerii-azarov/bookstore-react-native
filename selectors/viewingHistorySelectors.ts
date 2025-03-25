import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";

type ViewingHistoryStoreType = ReturnType<typeof useViewingHistoryStore.getState>;

export const selectViewingHistoryBooks = (state: ViewingHistoryStoreType) => state.viewingHistoryBooks;
export const selectViewingHistoryStatus = (state: ViewingHistoryStoreType) => state.viewingHistoryStatus;
export const selectViewingHistoryResponse = (state: ViewingHistoryStoreType) => state.viewingHistoryResponse;

export const selectLoadViewingHistory = (state: ViewingHistoryStoreType) => state.loadViewingHistory;
