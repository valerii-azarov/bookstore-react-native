import { doc, getDoc, getDocs, updateDoc, collection, writeBatch, arrayUnion, query, where, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrderReceipt, OrdersResponse, OrderCreation, OrderReceiptCreation } from "@/types";

export const ordersApi = {
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
      orderId: orderRef.id,
      createdAt: now,
    };

    const batch = writeBatch(db);
    batch.set(orderRef, order);
    batch.set(receiptRef, receipt);
    await batch.commit();

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

  getOrders: async (lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 10): Promise<OrdersResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "orders"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );
    
    return {
      orders: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },

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

  fetchReceiptByOrderId: async (orderId: string): Promise<OrderReceipt | null> => {
    const receiptDoc = await getDoc(doc(db, "receipts", orderId));    
    return receiptDoc.exists() ? ({ id: receiptDoc.id, ...receiptDoc.data() } as OrderReceipt) : null;
  },
};
