import { getDocs, collection, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrdersResponse } from "@/types";

export const orderHistoryApi = {
  fetchOrderHistory: async (userId: string, lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 10): Promise<OrdersResponse> => {    
    const snapshot = await getDocs(
      query(
        collection(db, "orders"), where("userId", "==", userId), orderBy("createdAt", "desc"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []),
      )
    );

    return {
      orders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },
};
