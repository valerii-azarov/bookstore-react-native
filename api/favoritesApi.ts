import { doc, getDoc, getDocs, updateDoc, collection, arrayUnion, arrayRemove, query, where } from "@firebase/firestore";
import { db } from "./firebase";
import { BaseBook } from "@/types";

export const favoritesApi = {
  addToFavorites: async (userId: string, bookId: string): Promise<void> => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { favorites: arrayUnion(bookId) });
  },

  removeFromFavorites: async (userId: string, bookId: string): Promise<void> => {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { favorites: arrayRemove(bookId) });
  },

  getFavoriteIds: async (userId: string): Promise<string[]> => {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data()?.favorites || [] : [];
  },

  getFavoriteBooks: async (userId: string): Promise<BaseBook[]> => {
    const favoriteIds = await favoritesApi.getFavoriteIds(userId);
    if (!favoriteIds.length) return [];

    const snapshot = await getDocs(query(collection(db, "books"), where("__name__", "in", favoriteIds)));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook));
  },

};
