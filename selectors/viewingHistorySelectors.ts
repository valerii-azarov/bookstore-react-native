import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";

type ViewingHistoryStoreType = ReturnType<typeof useViewingHistoryStore.getState>;

export const selectViewingHistory = (state: ViewingHistoryStoreType) => state.viewingHistory;
export const selectViewingHistoryStatus = (state: ViewingHistoryStoreType) => state.viewingHistoryStatus;
export const selectViewingHistoryResponse = (state: ViewingHistoryStoreType) => state.viewingHistoryResponse;

export const selectLoadViewingHistory = (state: ViewingHistoryStoreType) => state.loadViewingHistory;
export const selectResetViewingHistory = (state: ViewingHistoryStoreType) => state.resetViewingHistory;
