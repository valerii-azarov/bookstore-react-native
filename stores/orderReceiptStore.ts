import { create } from "zustand";
import { orderReceiptApi } from "@/api/orderReceiptApi";
import { OrderReceipt, OrderReceiptStatusType, ResponseType } from "@/types";

interface OrderReceiptStore {
  receipt: OrderReceipt | null;
  receiptStatus: OrderReceiptStatusType;
  receiptResponse: ResponseType | null;
  loadReceiptById: (receiptId: string) => Promise<void>;
  resetReceipt: () => void;
}

export const useOrderReceiptStore = create<OrderReceiptStore>((set, get) => ({
  receipt: null,
  receiptStatus: "idle",
  receiptResponse: null,

  loadReceiptById: async (receiptId: string) => {
    set({ receiptStatus: "loading", receiptResponse: null });

    orderReceiptApi.fetchReceiptById(receiptId)
      .then((receipt) =>
        set({
          receipt,
          receiptStatus: "idle",
          receiptResponse: { status: "success" },
        })
      )
      .catch((error) => {
        set({
          receipt: null,
          receiptResponse: { status: "error", message: error.message },
        });
      })
      .finally(() => set({ receiptStatus: "idle" }));
  },

  resetReceipt: () => {
    set({
      receipt: null,
      receiptStatus: "idle",
      receiptResponse: null,
    });
  },

}));
