import { create } from "zustand";
import { viewingHistoryApi } from "@/api/viewingHistoryApi";
import { BaseBook, ViewingHistoryStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface ViewingHistoryStore {
  viewingHistoryBooks: BaseBook[];
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

    viewingHistoryApi.getViewingHistory(userId)
      .then((viewingHistoryBooks) =>
        set({
          viewingHistoryBooks: viewingHistoryBooks.length > 0 ? viewingHistoryBooks : [],
          viewingHistoryResponse: { status: "success" },
        })
      )
      .catch((error) =>
        set({
          viewingHistoryResponse: { status: "error", message: error.message },
        })
      )
      .finally(() => set({ viewingHistoryStatus: "idle" }));
  },
}));
