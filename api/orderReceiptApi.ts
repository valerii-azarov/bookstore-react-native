import { doc, getDoc } from "@firebase/firestore";
import { db } from "./firebase";
import { OrderReceipt } from "@/types";

export const orderReceiptApi = {
  fetchReceiptById: async (receiptId: string): Promise<OrderReceipt | null> => {
    const receiptDoc = await getDoc(doc(db, "receipts", receiptId));    
    return receiptDoc.exists() ? ({ id: receiptDoc.id, ...receiptDoc.data() } as OrderReceipt) : null;
  },
};
