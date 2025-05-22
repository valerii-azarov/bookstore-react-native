import { getDocs, collection, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrderStatusType, OrdersResponse } from "@/types";

export const ordersApi = {
  fetchOrdersByStatuses: async (statuses: OrderStatusType[], lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 10): Promise<OrdersResponse> => {
    if (!statuses.length) return { orders: [], lastDoc: null };

    const snapshot = await getDocs(
      query(collection(db, "orders"), where("status", "in", statuses), orderBy("createdAt", "desc"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );

    return {
      orders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },
};
