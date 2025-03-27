import { doc, getDoc, getDocs, updateDoc, collection, arrayUnion, query, where } from "@firebase/firestore";
import { db } from "./firebase";
import { BaseBook, ViewingHistory } from "@/types";

export const viewingHistoryApi = {
  addToViewingHistory: async (userId: string, bookId: string): Promise<void> => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) return;
  
    const history = (userDoc.data()?.viewingHistory || []) as { bookId: string }[];
    if (history.some(entry => entry.bookId === bookId)) return;
  
    await updateDoc(userRef, { viewingHistory: arrayUnion({ bookId, timestamp: new Date().toISOString() }) });
  },
  
  getViewingHistory: async (userId: string): Promise<ViewingHistory[]> => {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data()?.viewingHistory || [] : [];
  },

  getViewingHistoryBooks: async (userId: string): Promise<BaseBook[]> => {
    const history = await viewingHistoryApi.getViewingHistory(userId);
    if (!history.length) return [];

    const snapshot = await getDocs(query(collection(db, "books"), where("__name__", "in", history.map(h => h.bookId))));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook));
  },  

};
