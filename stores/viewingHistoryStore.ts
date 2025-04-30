import { create } from "zustand";
import { viewingHistoryApi } from "@/api/viewingHistoryApi";
import { viewingHistoryHandler } from "@/helpers/viewingHistoryHandler";
import { ViewingHistoryByDate, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface ViewingHistoryStore {
  viewingHistory: ViewingHistoryByDate[];
  viewingHistoryStatus: StatusType;
  viewingHistoryResponse: ResponseType | null;
  loadViewingHistory: () => Promise<void>;
  resetViewingHistory: () => void;
}

export const useViewingHistoryStore = create<ViewingHistoryStore>((set, get) => ({
  viewingHistory: [],
  viewingHistoryStatus: "idle",
  viewingHistoryResponse: null,
  
  loadViewingHistory: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ viewingHistoryStatus: "loading", viewingHistoryResponse: null });

    const history = await viewingHistoryApi.getViewingHistory(userId);

    viewingHistoryApi
      .getViewingHistoryBooks(userId)
      .then((viewingHistoryBooks) => {
        const booksWithTimestamp = viewingHistoryHandler.addTimestamp(viewingHistoryBooks, history);
        const groupedViewingHistory = viewingHistoryHandler.groupViewingHistoryByDate(booksWithTimestamp);
        
        set({
          viewingHistory: groupedViewingHistory.length > 0 ? groupedViewingHistory : [],
          viewingHistoryResponse: { status: "success" },
          viewingHistoryStatus: "idle",
        });
      })
      .catch((error) =>
        set({
          viewingHistoryResponse: { status: "error", message: error.message },
          viewingHistoryStatus: "idle",
        })
      );
  },

  resetViewingHistory: () => {
   set({ 
      viewingHistory: [], 
      viewingHistoryStatus: "idle", 
      viewingHistoryResponse: null 
    });
  },

}));
