import { create } from "zustand";
import { orderReceiptApi } from "@/api/orderReceiptApi";
import { OrderReceipt, StatusType, ResponseType } from "@/types";

interface OrderReceiptStore {
  receipt: OrderReceipt | null;
  receiptId: string;
  receiptStatus: StatusType;
  receiptResponse: ResponseType | null;
  setReceiptById: (id: string) => void;
  loadReceiptById: () => Promise<void>;
  resetReceipt: () => void;
}

export const useOrderReceiptStore = create<OrderReceiptStore>((set, get) => ({
  receipt: null,
  receiptId: "",
  receiptStatus: "idle",
  receiptResponse: null,

  setReceiptById: (id: string) => {
    set({ receiptId: id });
  },

  loadReceiptById: async () => {
    const receiptId = get().receiptId;
    if (!receiptId) return;

    set({ receiptStatus: "loading", receiptResponse: null });

    orderReceiptApi
      .fetchReceiptById(receiptId)
      .then((receipt) =>
        set({
          receipt,
          receiptResponse: { status: "success" },
          receiptStatus: "idle",
        })
      )
      .catch((error) => {
        set({
          receipt: null,
          receiptResponse: { status: "error", message: error.message },
          receiptStatus: "idle",
        });
      });
  },

  resetReceipt: () => {
    set({
      receipt: null,
      receiptId: "",
      receiptStatus: "idle",
      receiptResponse: null,
    });
  },

}));
