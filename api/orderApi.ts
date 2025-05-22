import { doc, getDoc, updateDoc, collection, writeBatch, arrayUnion } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrderStatusType, OrderCreation, OrderReceiptCreation } from "@/types";

export const orderApi = {
  fetchOrderById: async (orderId: string): Promise<Order | null> => {
    const orderDoc = await getDoc(doc(db, "orders", orderId));   
    return orderDoc.exists() ? ({ id: orderDoc.id, ...orderDoc.data() } as Order) : null;
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

  updateOrderStatus: async (orderId: string, newStatus: OrderStatusType, trackingNumber?: string): Promise<Order> => {
    const orderRef = doc(db, "orders", orderId);
    const updatedAt = new Date().toISOString();

    const updateData: Record<string, string> = {
      status: newStatus,
      updatedAt,
    };

    if (newStatus === "shipped" && trackingNumber) {
      updateData.trackingNumber = trackingNumber.trim();
    }

    await updateDoc(orderRef, updateData);

    const updatedOrderDoc = await getDoc(orderRef);
    if (!updatedOrderDoc.exists()) {
      throw new Error("OrderError: Order not found after update (orders/order-not-found-after-update)");
    }
              
    return { id: updatedOrderDoc.id, ...updatedOrderDoc.data() } as Order;
  },
};
