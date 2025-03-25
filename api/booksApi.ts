import { getDocs, collection, query, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { fuseSearch } from "@/helpers/fuseSearch";
import { BaseBook, BookSearchKey, BooksResponse } from "@/types";

export const booksApi = {
  fetchBooks: async (lastDoc?: QueryDocumentSnapshot<DocumentData> | null, pageSize: number = 5, orderByField: keyof BaseBook = "title"): Promise<BooksResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "books"), orderBy(orderByField, "desc"), limit(pageSize), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );
    
    return {
      books: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },

  searchBooks: async (queryString: string, keys: BookSearchKey[], lastDoc?: QueryDocumentSnapshot<DocumentData> | null): Promise<BooksResponse> => {
    if (!queryString.trim()) return booksApi.fetchBooks(lastDoc);

    const snapshot = await getDocs(collection(db, "books"));
    const allBooks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook));
    
    return { 
      books: fuseSearch<BaseBook>(allBooks, keys).search(queryString.trim()).map(item => item.item), 
      lastDoc: null,
    };
  },

};
