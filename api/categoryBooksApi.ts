import { getDocs, collection, query, where, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { BaseBook, BooksResponse } from "@/types";

export const categoryBooksApi = {
  fetchBooksByCategory: async (category: string, lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 5): Promise<BooksResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "books"), where("genres", "array-contains", category), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );
          
    return {
      books: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },
};
