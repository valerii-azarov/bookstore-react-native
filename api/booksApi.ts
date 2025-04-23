import { getDocs, collection, query, orderBy, limit, startAfter, QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { db } from "./firebase";
import { fuseSearch } from "@/helpers/fuseSearch";
import { BaseBook, BookSearchKey, BooksResponse } from "@/types";

export const booksApi = {
  fetchBooks: async (
    lastDoc?: QueryDocumentSnapshot<DocumentData> | null, 
    itemsPerPage: number = 5, 
    orderByField: keyof BaseBook = "title"
  ): Promise<BooksResponse> => {
    const snapshot = await getDocs(
      query(collection(db, "books"), orderBy(orderByField, "desc"), limit(itemsPerPage), ...(lastDoc ? [startAfter(lastDoc)] : []))
    );

    if (snapshot.empty && !lastDoc) {
      throw new Error("Collection 'books' does not exist or is empty");
    }

    return {
      books: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BaseBook)),
      lastDoc: snapshot.docs[snapshot.docs.length - 1] || null,
    };
  },

  searchBooks: async <T>(
    query: string, 
    keys: BookSearchKey[],
    options: {
      limit?: number;
      lastDoc?: QueryDocumentSnapshot<DocumentData> | null;
      asBooksResponse?: boolean;
    } = {}
  ): Promise<T> => {
    const { limit = 10, lastDoc, asBooksResponse = false } = options;
    
    if (!query.trim()) {
      return (asBooksResponse ? await booksApi.fetchBooks(lastDoc, limit) : []) as T;
    }

    const snapshot = await getDocs(collection(db, "books"));
    const allBooks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BaseBook));

    const searchedBooks = fuseSearch<BaseBook>(allBooks, keys).search(query.trim()).map((res) => res.item);

    return (asBooksResponse
      ? { books: searchedBooks, lastDoc: null }
      : searchedBooks.slice(0, limit)) as T;
  },

};
