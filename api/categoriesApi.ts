import { getDocs, collection, query, where, limit } from "@firebase/firestore";
import { db } from "./firebase";
import { BaseBook } from "@/types";

export const categoriesApi = {
  fetchAllCategories: async (categories: string[], pageSize: number = 5): Promise<Record<string, BaseBook[]>> => {
    const results = await Promise.all(
      categories.map(async (category) => {
        const snapshot = await getDocs(
          query(collection(db, "books"), where("genres", "array-contains", category), limit(pageSize))
        );
        return snapshot.docs.length ? { [category]: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook)) } : null;
      })
    );
    return Object.assign({}, ...results.filter(Boolean));
  },
};
