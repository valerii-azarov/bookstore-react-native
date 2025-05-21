import { doc, getDoc, getDocs, updateDoc, collection, writeBatch, arrayUnion, query, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrderStatusType, OrdersResponse, OrderCreation, OrderReceiptCreation } from "@/types";

export const orderApi = {
  fetchOrderById: async (orderId: string): Promise<Order | null> => {
    const orderDoc = await getDoc(doc(db, "orders", orderId));   
    return orderDoc.exists() ? ({ id: orderDoc.id, ...orderDoc.data() } as Order) : null;
  },

  fetchOrdersByStatuses: async (statuses: OrderStatusType[], lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 5): Promise<OrdersResponse> => {
    if (!statuses.length) return { orders: [], lastDoc: null };

    const snapshot = await getDocs(
      query(collection(db, "orders"), where("status", "in", statuses), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );

    return {
      orders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },

  createOrder: async (userId: string, orderData: OrderCreation, receiptData: OrderReceiptCreation): Promise<Order> => {
    const userRef = doc(db, "users", userId);
    const orderRef = doc(collection(db, "orders"));
    const receiptRef = doc(collection(db, "receipts"));
    const now = new Date().toISOString();

    const order = {
      ...orderData,
      userId,
      createdAt: now,
      updatedAt: now,
      receiptId: receiptRef.id,
    };

    const receipt = {
      ...receiptData,
      id: receiptRef.id,
      userId,
      orderId: orderRef.id,
      createdAt: now,
    };

    const batch = writeBatch(db);
    batch.set(orderRef, order);
    batch.set(receiptRef, receipt);

    await batch.commit().catch((error) => {
      console.error(`Batch commit error: ${error.message}`);
      throw new Error("OrderError: Failed to save order and receipt (orders/batch-commit-failed)");
    });

    const createdOrderDoc = await getDoc(orderRef);
    if (!createdOrderDoc.exists()) {
      throw new Error("OrderError: Failed to fetch created order (orders/created-order-not-found)");
    }
    
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      throw new Error("UserError: User not found (users/user-not-found)");
    }

    await updateDoc(userRef, { orders: arrayUnion(createdOrderDoc.id) });
    
    return { id: createdOrderDoc.id, ...createdOrderDoc.data() } as Order;
  },

};
