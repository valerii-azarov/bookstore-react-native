import { doc, getDoc, setDoc, updateDoc, collection, arrayUnion } from "@firebase/firestore";
import { db } from "./firebase";
import { Order, OrderCreation } from "@/types";

export const ordersApi = {
  createOrder: async (userId: string, orderData: OrderCreation): Promise<Order> => {
    const userRef = doc(db, "users", userId);
    const orderRef = doc(collection(db, "orders"));
    const now = new Date().toISOString();

    await setDoc(orderRef, { ...orderData, userId, createdAt: now, updatedAt: now });

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
