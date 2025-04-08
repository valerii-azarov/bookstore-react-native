import { getDocs, collection, query, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrdersResponse } from "@/types";

export const ordersApi = {
  fetchOrders: async (lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 10): Promise<OrdersResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "orders"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );
    
    return {
      orders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },
};
