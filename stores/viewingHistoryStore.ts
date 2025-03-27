import { create } from "zustand";
import { viewingHistoryApi } from "@/api/viewingHistoryApi";
import { viewingHistoryHandler } from "@/helpers/viewingHistoryHandler";
import { ViewingHistoryBook, ViewingHistoryStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface ViewingHistoryStore {
  viewingHistoryBooks: ViewingHistoryBook[];
  viewingHistoryStatus: ViewingHistoryStatusType;
  viewingHistoryResponse: ResponseType | null;
  loadViewingHistory: () => Promise<void>;
}

export const useViewingHistoryStore = create<ViewingHistoryStore>((set, get) => ({
  viewingHistoryBooks: [],
  viewingHistoryStatus: "idle",
  viewingHistoryResponse: null,
  
  loadViewingHistory: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ viewingHistoryStatus: "loading", viewingHistoryResponse: null });

    const history = await viewingHistoryApi.getViewingHistory(userId);

    viewingHistoryApi.getViewingHistoryBooks(userId)
      .then((viewingHistoryBooks) => {
        const booksWithTimestamp = viewingHistoryHandler.addTimestamp(viewingHistoryBooks, history);
        set({
          viewingHistoryBooks: booksWithTimestamp.length > 0 ? booksWithTimestamp : [],
          viewingHistoryResponse: { status: "success" },
        })
      })
      .catch((error) =>
        set({
          viewingHistoryResponse: { status: "error", message: error.message },
        })
      )
      .finally(() => set({ viewingHistoryStatus: "idle" }));
  },
}));
